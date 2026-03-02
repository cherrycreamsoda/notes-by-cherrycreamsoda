import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { animate } from '@/utils/animation'

/**
 * UI Context
 *
 * Owns all layout / chrome state: sidebar, topbar, and editor-pane visibility.
 *
 * Components that only care about layout subscribe here and never
 * re-render when notes change — this matters as the note list grows.
 */

const UIContext = createContext(null)

/* ── Provider ─────────────────────────────────────────────────── */

export const UIProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [topbarOpen, setTopbarOpen] = useState(true)
  const [noteOpen, setNoteOpen] = useState(false)
  const [focusTitle, setFocusTitle] = useState(false)

  const toggleSidebar = useCallback(() => {
    animate()
    setSidebarOpen(prev => !prev)
  }, [])

  const toggleTopbar = useCallback(() => {
    animate()
    setTopbarOpen(prev => !prev)
  }, [])

  const openNotePane  = useCallback((opts = {}) => {
    setNoteOpen(true)
    if (opts.focusTitle) setFocusTitle(true)
  }, [])
  const closeNotePane = useCallback(() => setNoteOpen(false), [])

  const value = useMemo(() => ({
    sidebarOpen,
    topbarOpen,
    noteOpen,
    focusTitle,
    toggleSidebar,
    toggleTopbar,
    openNotePane,
    closeNotePane,
    setFocusTitle,
  }), [
    sidebarOpen, topbarOpen, noteOpen,
    toggleSidebar, toggleTopbar, openNotePane, closeNotePane,
  ])

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

/* ── Hook ─────────────────────────────────────────────────────── */

export const useUI = () => {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within <AppProvider>')
  return ctx
}
