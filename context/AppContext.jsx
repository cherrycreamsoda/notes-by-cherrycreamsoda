import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { LayoutAnimation, Platform, UIManager } from 'react-native'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

// Web: CSS transitions handle animation (webTransition helper in style files).
// Native: LayoutAnimation handles animation before each state change.
// These must NOT both run on web — LayoutAnimation's global transition
// overrides the specific CSS transitionProperty set by webTransition.
const animate = () => { 
  if (Platform.OS !== 'web') {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
}

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [topbarOpen, setTopbarOpen] = useState(true)
  const [noteOpen, setNoteOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    animate()
    setSidebarOpen(prev => !prev)
  }, [])

  const toggleTopbar = useCallback(() => {
    animate()
    setTopbarOpen(prev => !prev)
  }, [])

  const openNote = useCallback(() => setNoteOpen(true), [])
  const closeNote = useCallback(() => setNoteOpen(false), [])

  const value = useMemo(() => ({
    sidebarOpen,
    topbarOpen,
    noteOpen,
    toggleSidebar,
    toggleTopbar,
    openNote,
    closeNote,
  }), [sidebarOpen, topbarOpen, noteOpen, toggleSidebar, toggleTopbar, openNote, closeNote])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppProvider')
  }
  return context
}
