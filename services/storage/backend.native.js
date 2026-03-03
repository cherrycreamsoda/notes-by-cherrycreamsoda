/**
 * Native Storage Backend — expo-file-system
 *
 * Stores each note as a real .txt file inside the app's sandboxed
 * documents directory.  Files are human-readable — open one in any
 * text editor and see the note body + metadata footer.
 *
 * Capacity: limited only by device storage.
 *
 * Directory layout:
 *   {documentDirectory}/notes/
 *     ├── lz5k8d03b2c1.txt
 *     ├── lz5k9f07x2m4.txt
 *     └── ...
 *
 * Works on: iOS, Android, macOS (Catalyst).
 */

import * as FileSystem from 'expo-file-system'

const NOTES_DIR = FileSystem.documentDirectory + 'notes/'

/** Resolve a note ID to its full file path. */
const toPath = (key) => NOTES_DIR + key + '.txt'

/* ── Public backend interface ─────────────────────────────── */

const backend = {
  /** Create the notes directory if it doesn't exist. */
  async init() {
    const info = await FileSystem.getInfoAsync(NOTES_DIR)
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(NOTES_DIR, { intermediates: true })
    }
  },

  /** Write a note's file content to disk. */
  async writeFile(key, content) {
    await FileSystem.writeAsStringAsync(toPath(key), content, {
      encoding: FileSystem.EncodingType.UTF8,
    })
  },

  /** Read a note's file content. Returns null if not found. */
  async readFile(key) {
    const path = toPath(key)
    const info = await FileSystem.getInfoAsync(path)
    if (!info.exists) return null
    return await FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.UTF8,
    })
  },

  /** Delete a note's file from disk. */
  async deleteFile(key) {
    const path = toPath(key)
    const info = await FileSystem.getInfoAsync(path)
    if (info.exists) {
      await FileSystem.deleteAsync(path)
    }
  },

  /** List all stored note IDs (strips .txt; excludes internal __* keys). */
  async listKeys() {
    const info = await FileSystem.getInfoAsync(NOTES_DIR)
    if (!info.exists) return []
    const files = await FileSystem.readDirectoryAsync(NOTES_DIR)
    return files
      .filter((f) => f.endsWith('.txt') && !f.startsWith('__'))
      .map((f) => f.replace(/\.txt$/, ''))
  },
}

export default backend
