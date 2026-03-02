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
