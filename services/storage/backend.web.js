/**
 * Web Storage Backend — File System Access API + IndexedDB fallback
 *
 * Primary:   File System Access API (Chrome/Edge/Opera 86+)
 *            The user picks a real folder on their disk once; notes
 *            are written as human-readable .txt files there.
 *
 * Fallback:  IndexedDB (Safari, Firefox, or if user declines picker)
 *            Notes stored as records in a browser-managed database.
 *
 * The directory handle is persisted in IndexedDB so the user only
 * picks their notes folder once.  On subsequent visits the handle
 * is restored and permission is silently verified.
 *
 * Keys prefixed with `__` (e.g. `__activeNoteId__`) are internal
 * app state and ALWAYS live in IndexedDB — never on the filesystem.
 */

const DB_NAME    = 'notesByCherryCreamSoda'
const DB_VERSION = 1
const STORE_NAME = 'notes'   // IDB object store (fallback + internal keys)

/* ══════════════════════════════════════════════════════════════
 *  IndexedDB helpers  (fallback storage + internal-key storage)
 * ══════════════════════════════════════════════════════════════ */

let _db = null

const openDB = () =>
  new Promise((resolve, reject) => {
    if (_db) return resolve(_db)
    const req = indexedDB.open(DB_NAME, DB_VERSION)

    req.onupgradeneeded = (e) => {
      const db = e.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }

    req.onsuccess = () => { _db = req.result; resolve(_db) }
    req.onerror   = ()  => reject(req.error)
  })

const getStore = async (mode) => {
  const db = await openDB()
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME)
}

const wrap = (req) =>
  new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result)
    req.onerror   = ()  => reject(req.error)
  })

const idbGet    = async (k)    => { const s = await getStore('readonly');  return (await wrap(s.get(k))) ?? null }
const idbPut    = async (k, v) => { const s = await getStore('readwrite'); await wrap(s.put(v, k)) }
const idbDel    = async (k)    => { const s = await getStore('readwrite'); await wrap(s.delete(k)) }
const idbKeys   = async ()     => { const s = await getStore('readonly');  return await wrap(s.getAllKeys()) }

/* ══════════════════════════════════════════════════════════════
 *  File System Access API
 * ══════════════════════════════════════════════════════════════ */

const INTERNAL_PREFIX  = '__'
const DIR_HANDLE_KEY   = '__dirHandle__'

/** Is the File System Access API available? */
const fsaSupported = () =>
  typeof window !== 'undefined' && 'showDirectoryPicker' in window

/** The active directory handle (null → IDB fallback). */
let _dirHandle = null

/**
 * Stored handle that exists but hasn't been re-granted permission yet.
 * Non-null means "the user previously picked a folder but permission
 * expired after page reload — click the floppy to reconnect."
 */
let _pendingHandle = null

/** Is a key internal app state (not a note)? */
const isInternal = (key) => key.startsWith(INTERNAL_PREFIX)

/* ── Restore a saved handle ───────────────────────────────── */

const tryRestoreHandle = async () => {
  if (!fsaSupported()) return false
  try {
    const handle = await idbGet(DIR_HANDLE_KEY)
    if (!handle) return false

    // Check existing permission (won't prompt)
    const perm = await handle.queryPermission({ mode: 'readwrite' })
    if (perm === 'granted') {
      _dirHandle = handle
      _pendingHandle = null
      return true
    }

    // Permission expired — stash the handle for re-auth on user gesture
    _pendingHandle = handle
    return false
  } catch {
    return false
  }
}

/* ── Prompt the user to pick a folder ─────────────────────── */

/**
 * Reconnect to a previously chosen folder, or open the directory picker.
 *
 * If the user previously picked a folder and permission expired (common
 * after page reload), this re-requests permission on the SAME handle —
 * no new picker, just a one-click "Allow" prompt.
 *
 * If no previous handle exists, opens the full directory picker.
 *
 * Must be called from a click / keyboard handler (user gesture).
 *
 * @returns {Promise<{ granted: boolean, reconnected: boolean, audit: object|null }>}
 */
export const requestFolderAccess = async () => {
  if (!fsaSupported()) return { granted: false, reconnected: false, audit: null }

  // Case 1: re-grant permission on existing handle (no picker needed)
  if (_pendingHandle) {
    try {
      const perm = await _pendingHandle.requestPermission({ mode: 'readwrite' })
      if (perm === 'granted') {
        _dirHandle = _pendingHandle
        _pendingHandle = null
        await idbPut(DIR_HANDLE_KEY, _dirHandle)
        const audit = await auditBrowserStorage()
        return { granted: true, reconnected: true, audit }
      }
    } catch { /* fall through to picker */ }
  }

  // Case 2: fresh folder pick
  try {
    const handle = await window.showDirectoryPicker({
      id: 'notes-folder',
      mode: 'readwrite',
      startIn: 'documents',
    })
    _dirHandle = handle
    _pendingHandle = null
    await idbPut(DIR_HANDLE_KEY, handle)
    await migrateIdbToFs()
    const audit = await auditBrowserStorage()
    return { granted: true, reconnected: false, audit }
  } catch {
    return { granted: false, reconnected: false, audit: null }
  }
}

/** Whether we currently have an active filesystem connection. */
export const hasFileSystemAccess = () => _dirHandle !== null

/** Whether a folder was previously selected but needs re-auth. */
export const needsReconnect = () => _pendingHandle !== null

/* ── Migrate IDB fallback notes → filesystem ──────────────── */

const migrateIdbToFs = async () => {
  if (!_dirHandle) return
  const keys = await idbKeys()
  for (const key of keys) {
    if (isInternal(key)) continue          // skip app state keys
    try {
      const content = await idbGet(key)
      if (content) {
        await fsWrite(key, content)
        await idbDel(key)                  // remove from IDB after copy
      }
    } catch (e) {
      console.warn(`[storage] migration failed for "${key}":`, e)
    }
  }
}

/**
 * Audit what remains in IndexedDB after migration.
 *
 * Returns a report object:
 *   {
 *     totalKeys: number,
 *     totalSizeBytes: number,
 *     keys: [{ key, sizeBytes, purpose }]
 *   }
 *
 * Useful after calling requestFolderAccess() to confirm
 * all note data has moved to the filesystem.
 */
export const auditBrowserStorage = async () => {
  const allKeys = await idbKeys()
  const entries = []
  let total = 0

  for (const key of allKeys) {
    const val = await idbGet(key)
    const size = val ? new Blob([typeof val === 'string' ? val : '']).size : 0
    let purpose = 'unknown'

    if (key === DIR_HANDLE_KEY) purpose = 'Folder handle (required for filesystem access)'
    else if (key === '__activeNoteId__') purpose = 'Last active note ID (session restore)'
    else if (key.startsWith(INTERNAL_PREFIX)) purpose = 'Internal app state'
    else purpose = 'Note data (should have been migrated)'

    entries.push({ key, sizeBytes: size, purpose })
    total += size
  }

  const report = {
    totalKeys: entries.length,
    totalSizeBytes: total,
    keys: entries,
  }

  // Log a readable summary to the console
  console.group('[storage] Browser memory audit')
  console.log(`Total keys in IndexedDB: ${entries.length}`)
  console.log(`Total size: ${(total / 1024).toFixed(2)} KB`)
  entries.forEach(e =>
    console.log(`  ${e.key} — ${e.sizeBytes} bytes — ${e.purpose}`)
  )
  console.groupEnd()

  return report
}

/* ── Filesystem read / write / delete / list ──────────────── */

const fsWrite = async (key, content) => {
  const fh = await _dirHandle.getFileHandle(key + '.txt', { create: true })
  const w  = await fh.createWritable()
  await w.write(content)
  await w.close()
}

const fsRead = async (key) => {
  try {
    const fh   = await _dirHandle.getFileHandle(key + '.txt')
    const file = await fh.getFile()
    return await file.text()
  } catch {
    return null                            // file doesn't exist
  }
}

const fsDelete = async (key) => {
  try {
    await _dirHandle.removeEntry(key + '.txt')
  } catch {
    /* file didn't exist — that's fine */
  }
}

const fsListKeys = async () => {
  const keys = []
  for await (const [name, handle] of _dirHandle.entries()) {
    if (handle.kind === 'file' && name.endsWith('.txt')) {
      keys.push(name.replace(/\.txt$/, ''))
    }
  }
  return keys
}

/* ══════════════════════════════════════════════════════════════
 *  Public backend interface
 *
 *  Internal keys (__*) → always IndexedDB
 *  Note keys         → filesystem when available, else IndexedDB
 * ══════════════════════════════════════════════════════════════ */

const backend = {
  async init() {
    await openDB()
    await tryRestoreHandle()
  },

  async writeFile(key, content) {
    if (isInternal(key) || !_dirHandle) {
      await idbPut(key, content)
    } else {
      await fsWrite(key, content)
    }
  },

  async readFile(key) {
    if (isInternal(key) || !_dirHandle) {
      return await idbGet(key)
    }
    return await fsRead(key)
  },

  async deleteFile(key) {
    if (isInternal(key) || !_dirHandle) {
      await idbDel(key)
    } else {
      await fsDelete(key)
    }
  },

  /** List note keys only (excludes internal __* keys). */
  async listKeys() {
    if (_dirHandle) {
      return await fsListKeys()
    }
    const all = await idbKeys()
    return all.filter(k => !isInternal(k))
  },
}

export default backend
