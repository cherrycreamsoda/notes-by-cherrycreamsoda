/**
 * Storage Service
 *
 * Unified API for persisting notes to the device.
 *
 * Metro's platform-specific module resolution picks the right backend
 * automatically:
 *   Web     → backend.web.js   (IndexedDB)
 *   iOS     → backend.native.js (expo-file-system, sandboxed)
 *   Android → backend.native.js (expo-file-system, sandboxed)
 *
 * The rest of the app imports from this file only — it never
 * needs to know which backend is active.
 *
 * Public API:
 *   initStorage()           — call once on mount
 *   loadAllNotes()          — returns every persisted note (sorted newest-first)
 *   persistNote(note)       — write / update a single note to storage
 *   deleteNoteFile(id)      — remove a note's file from storage
 */

import backend from './backend'
import { serializeNoteToFile, hydrateNote } from '../notes'

/* ── Initialise ───────────────────────────────────────────── */

/**
 * Prepare the storage backend (create DB / directories).
 * Call once before any other storage operation.
 */
export const initStorage = () => backend.init()

/* ── Load ─────────────────────────────────────────────────── */

/**
 * Read every persisted note and return a fully-hydrated array
 * sorted by most-recently-updated first.
 *
 * On a cold start with no index file this scans every stored note.
 * For <500 notes this completes in well under 100 ms on any device.
 */
export const loadAllNotes = async () => {
  const keys = await backend.listKeys()
  const notes = []

  for (const key of keys) {
    try {
      const content = await backend.readFile(key)
      if (content) {
        notes.push(hydrateNote(content, key))
      }
    } catch (e) {
      console.warn(`[storage] failed to load note "${key}":`, e)
    }
  }

  // Most recent first
  notes.sort((a, b) => b.updatedAt - a.updatedAt)
  return notes
}

/* ── Persist ──────────────────────────────────────────────── */

/**
 * Write (or overwrite) a single note to storage.
 * The note is serialised as a human-readable .txt file
 * (body + metadata footer).
 */
export const persistNote = async (note) => {
  try {
    const content = serializeNoteToFile(note)
    await backend.writeFile(note.id, content)
  } catch (e) {
    console.warn(`[storage] failed to persist note "${note.id}":`, e)
  }
}

/* ── Delete ───────────────────────────────────────────────── */

/**
 * Permanently remove a note's file from storage.
 */
export const deleteNoteFile = async (id) => {
  try {
    await backend.deleteFile(id)
  } catch (e) {
    console.warn(`[storage] failed to delete note "${id}":`, e)
  }
}
