/**
 * Notes Service
 *
 * Pure business logic for note operations — no React, no state.
 * This keeps domain logic separate from the UI layer, making it
 * easy to test, reuse, and eventually back with a real API or DB.
 */

let nextId = 1

/** All available note types. Extend this as new editors are added. */
export const NOTE_TYPES = {
  SIMPLE_TEXT: 'simpletext',
}

/**
 * Creates a plain note object with sensible defaults.
 *
 * @param {string} type  One of NOTE_TYPES (defaults to simpletext).
 * @returns {object}     A new note ready to be stored in state.
 */
export const createNote = (type = NOTE_TYPES.SIMPLE_TEXT) => ({
  id: String(nextId++),
  type,
  title: '',
  body: '',
  pinned: false,
  locked: false,
  deleted: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

/**
 * Returns a new notes array with the target note updated.
 * Immutable — the original array is never mutated.
 */
export const applyNoteUpdate = (notes, id, changes) =>
  notes.map(n =>
    n.id === id ? { ...n, ...changes, updatedAt: Date.now() } : n,
  )

/**
 * Returns a new notes array with the target note removed.
 */
export const removeNote = (notes, id) => notes.filter(n => n.id !== id)

/* ── File-name helpers ──────────────────────────────────────── */

/** Map note type → file extension. */
const EXTENSION_MAP = {
  [NOTE_TYPES.SIMPLE_TEXT]: 'txt',
  // future: [NOTE_TYPES.MARKDOWN]: 'md',
}

/**
 * Derive a PascalCase file name from a note title.
 *   "Hamza test Document on planning" → "HamzaTestDocumentOnPlanning"
 * Falls back to "Untitled" when title is empty.
 */
export const toPascalCase = (str) => {
  if (!str || !str.trim()) return 'Untitled'
  return str
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

/**
 * Build the full display file name for a note.
 *   { title: 'My Note', type: 'simpletext' } → "MyNote.txt"
 */
export const toFileName = (note) => {
  if (!note) return 'untitled.txt'
  const ext = EXTENSION_MAP[note.type] ?? 'txt'
  return `${toPascalCase(note.title)}.${ext}`
}

/* ── Metadata serialization ─────────────────────────────────── */

const META_SEPARATOR = '\n\n---\n'
const META_PREFIX    = '[notesByCherryCreamSoda]'

/**
 * Serialize note metadata into a footer block appended to file content.
 *
 * Format (last lines of the exported file):
 *   ---
 *   [notesByCherryCreamSoda]
 *   locked: true
 *   pinned: false
 *   type: simpletext
 *   created: 1709337600000
 */
const serializeMetadata = (note) => {
  const lines = [
    META_PREFIX,
    `locked: ${!!note.locked}`,
    `pinned: ${!!note.pinned}`,
    `type: ${note.type}`,
    `created: ${note.createdAt}`,
  ]
  return META_SEPARATOR + lines.join('\n')
}

/**
 * Parse metadata from the footer block of imported file content.
 * Returns { body, meta } where meta contains the parsed flags
 * (or defaults if no footer is found).
 */
export const parseMetadata = (raw) => {
  const idx = raw.lastIndexOf(META_SEPARATOR)
  if (idx === -1 || !raw.includes(META_PREFIX)) {
    return { body: raw, meta: null }
  }

  const body = raw.slice(0, idx)
  const block = raw.slice(idx + META_SEPARATOR.length)
  const meta = {}

  for (const line of block.split('\n')) {
    const match = line.match(/^(\w+):\s*(.+)$/)
    if (!match) continue
    const [, key, val] = match
    if (val === 'true')       meta[key] = true
    else if (val === 'false') meta[key] = false
    else if (/^\d+$/.test(val)) meta[key] = Number(val)
    else                      meta[key] = val
  }

  return { body, meta }
}

/**
 * Build an exportable representation of a note.
 * This is the single place to extend when we add new formats.
 *
 * @param {object} note
 * @returns {{ fileName: string, content: string, mimeType: string }}
 */
export const getExportData = (note) => {
  if (!note) return null
  return {
    fileName: toFileName(note),
    content: (note.body ?? '') + serializeMetadata(note),
    mimeType: 'text/plain',
  }
}

/* ── Import helpers ─────────────────────────────────────────── */

/**
 * Split a raw string on spaces AND camelCase / PascalCase boundaries.
 *   "TimePlanner"          → ["Time", "Planner"]
 *   "my File"              → ["my", "File"]
 *   "some important details" → ["some", "important", "details"]
 */
const splitWords = (raw) =>
  raw
    // insert a space before each uppercase letter that follows a lowercase
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)

/**
 * Strip the extension from a filename.
 *   "my File.txt" → "my File"
 *   "TimePlanner" → "TimePlanner"   (no ext)
 */
const stripExtension = (name) => name.replace(/\.[^.]+$/, '')

/**
 * Derive a human-readable Title from an imported file name.
 *   "my File.txt"              → "My File"
 *   "some important details"   → "Some Important Details"
 *   "TimePlanner"              → "Time Planner"
 */
export const fileNameToTitle = (fileName) => {
  const base = stripExtension(fileName).trim()
  if (!base) return 'Untitled'
  return splitWords(base)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

/**
 * Create a fully-populated note object from an imported file.
 * If the file contains a notesByCherryCreamSoda metadata footer,
 * locked / pinned / type / created values are restored.
 *
 * @param {string} fileName  The original file name (e.g. "my File.txt")
 * @param {string} rawContent   The file's full text content
 * @returns {object}         A note ready to be stored in state
 */
export const createImportedNote = (fileName, rawContent) => {
  const { body, meta } = parseMetadata(rawContent)
  const type = meta?.type ?? NOTE_TYPES.SIMPLE_TEXT
  const note = createNote(type)
  note.title = fileNameToTitle(fileName)
  note.body = body

  // Restore metadata flags when present
  if (meta) {
    if (typeof meta.locked === 'boolean') note.locked = meta.locked
    if (typeof meta.pinned === 'boolean') note.pinned = meta.pinned
    if (typeof meta.created === 'number') note.createdAt = meta.created
  }

  return note
}
