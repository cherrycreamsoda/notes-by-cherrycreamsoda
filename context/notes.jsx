import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react'
import {
  createNote as createNoteObject,
  createImportedNote,
  applyNoteUpdate,
  removeNote,
} from '@/services/notes'
import {
  initStorage,
  loadAllNotes,
  persistNote,
  deleteNoteFile,
} from '@/services/storage'
import backend from '@/services/storage/backend'

/**
 * Notes Context
 *
 * Owns the note data model — the list of notes, which note is active,
 * and all CRUD operations.
 *
 * Business logic lives in `services/notes.js`; persistence lives in
 * `services/storage/`.  This file wires both into React state.
 *
 * Persistence strategy:
 *   • Create / Import  → immediate save (tiny payload)
 *   • Update (typing)  → debounced save (500ms after last keystroke)
 *   • Delete (Close)   → immediate file removal
 *   • Soft delete      → debounced save (deleted flag persisted in file)
 */

const NotesContext = createContext(null)

/** Debounce delay for persisting edits (ms). */
const SAVE_DEBOUNCE = 500

/* ── Provider ─────────────────────────────────────────────────── */

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [activeNoteId, setActiveNoteId] = useState(null)
  const [loaded, setLoaded] = useState(false)

  /* ── Persistence plumbing ──────────────────────────────────── */

  /** Always-current copy of notes for debounced callbacks. */
  const notesRef = useRef([])
  useEffect(() => { notesRef.current = notes }, [notes])

  /** Persist activeNoteId so it survives refresh. */
  useEffect(() => {
    if (!loaded) return          // don't overwrite during initial load
    if (activeNoteId) {
      backend.writeFile('__activeNoteId__', activeNoteId)
    } else {
      backend.deleteFile('__activeNoteId__')
    }
  }, [activeNoteId, loaded])

  /** Track which note IDs have unsaved changes. */
  const dirtyIds = useRef(new Set())
  const saveTimer = useRef(null)

  /** Schedule a debounced flush of all dirty notes. */
  const scheduleSave = useCallback((id) => {
    dirtyIds.current.add(id)
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      for (const dirtyId of dirtyIds.current) {
        const note = notesRef.current.find(n => n.id === dirtyId)
        if (note) persistNote(note)
      }
      dirtyIds.current.clear()
    }, SAVE_DEBOUNCE)
  }, [])

  /** Immediately flush any pending saves (called on unmount). */
  const flushSaves = useCallback(() => {
    clearTimeout(saveTimer.current)
    for (const dirtyId of dirtyIds.current) {
      const note = notesRef.current.find(n => n.id === dirtyId)
      if (note) persistNote(note)
    }
    dirtyIds.current.clear()
  }, [])

  /* ── Load from storage on mount ──────────────────────────── */

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        await initStorage()
        const saved = await loadAllNotes()
        if (!cancelled && saved.length) {
          setNotes(saved)

          // Restore the last active note (if it still exists)
          const lastId = await backend.readFile('__activeNoteId__')
          if (lastId && saved.some(n => n.id === lastId)) {
            setActiveNoteId(lastId)
          }
        }
      } catch (e) {
        console.warn('[notes] failed to load from storage:', e)
      }
      if (!cancelled) setLoaded(true)
    }
    load()
    return () => { cancelled = true }
  }, [])

  /** Flush pending saves when the provider unmounts. */
  useEffect(() => flushSaves, [flushSaves])

  /* ── CRUD ──────────────────────────────────────────────────── */

  const addNote = useCallback((type) => {
    const note = createNoteObject(type)
    setNotes(prev => [note, ...prev])
    setActiveNoteId(note.id)
    persistNote(note)
    return note
  }, [])

  const updateNote = useCallback((id, changes) => {
    setNotes(prev => applyNoteUpdate(prev, id, changes))
    scheduleSave(id)
  }, [scheduleSave])

  const importNote = useCallback((fileName, content) => {
    const note = createImportedNote(fileName, content)
    setNotes(prev => [note, ...prev])
    setActiveNoteId(note.id)
    persistNote(note)
    return note
  }, [])

  const deleteNote = useCallback((id) => {
    setNotes(prev => removeNote(prev, id))
    setActiveNoteId(prev => (prev === id ? null : prev))
    deleteNoteFile(id)
  }, [])

  /* ── Selection ─────────────────────────────────────────────── */

  const selectNote = useCallback((id) => {
    setActiveNoteId(id ?? null)
  }, [])

  /* ── Reload from storage (after reconnecting to filesystem) ─ */

  const reloadFromStorage = useCallback(async () => {
    try {
      const saved = await loadAllNotes()
      if (saved.length) {
        setNotes(saved)

        const lastId = await backend.readFile('__activeNoteId__')
        if (lastId && saved.some(n => n.id === lastId)) {
          setActiveNoteId(lastId)
        }
      }
    } catch (e) {
      console.warn('[notes] reload from storage failed:', e)
    }
  }, [])

  /* ── Derived ───────────────────────────────────────────────── */

  const activeNote = useMemo(
    () => notes.find(n => n.id === activeNoteId) ?? null,
    [notes, activeNoteId],
  )

  /* ── Context value ─────────────────────────────────────────── */

  const value = useMemo(() => ({
    notes,
    activeNote,
    loaded,
    addNote,
    updateNote,
    importNote,
    deleteNote,
    selectNote,
    reloadFromStorage,
  }), [
    notes, activeNote, loaded,
    addNote, updateNote, importNote, deleteNote, selectNote, reloadFromStorage,
  ])

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}

/* ── Hook ─────────────────────────────────────────────────────── */

export const useNotes = () => {
  const ctx = useContext(NotesContext)
  if (!ctx) throw new Error('useNotes must be used within <AppProvider>')
  return ctx
}
