import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import {
  createNote as createNoteObject,
  createImportedNote,
  applyNoteUpdate,
  removeNote,
} from '@/services/notes'

/**
 * Notes Context
 *
 * Owns the note data model — the list of notes, which note is active,
 * and all CRUD operations.
 *
 * Business logic lives in `services/notes.js`; this file only wires
 * that logic into React state.  If we later swap to a real backend or
 * local DB, only the service layer needs to change.
 */

const NotesContext = createContext(null)

/* ── Provider ─────────────────────────────────────────────────── */

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [activeNoteId, setActiveNoteId] = useState(null)

  /* CRUD */

  const addNote = useCallback((type) => {
    const note = createNoteObject(type)
    setNotes(prev => [note, ...prev])
    setActiveNoteId(note.id)
    return note
  }, [])

  const updateNote = useCallback((id, changes) => {
    setNotes(prev => applyNoteUpdate(prev, id, changes))
  }, [])

  const importNote = useCallback((fileName, content) => {
    const note = createImportedNote(fileName, content)
    setNotes(prev => [note, ...prev])
    setActiveNoteId(note.id)
    return note
  }, [])

  const deleteNote = useCallback((id) => {
    setNotes(prev => removeNote(prev, id))
    setActiveNoteId(prev => (prev === id ? null : prev))
  }, [])

  /* Selection */

  const selectNote = useCallback((id) => {
    if (id) setActiveNoteId(id)
  }, [])

  /* Derived */

  const activeNote = useMemo(
    () => notes.find(n => n.id === activeNoteId) ?? null,
    [notes, activeNoteId],
  )

  /* Value */

  const value = useMemo(() => ({
    notes,
    activeNote,
    addNote,
    updateNote,
    importNote,
    deleteNote,
    selectNote,
  }), [
    notes, activeNote,
    addNote, updateNote, importNote, deleteNote, selectNote,
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
