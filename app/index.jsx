import {
  View,
  useWindowDimensions,
} from 'react-native'
import { useRef, useEffect } from 'react'
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/theme'
import Topbar from '@/components/Topbar/Topbar'
import TopbarPanel from '@/components/Topbar/TopbarPanel'
import Sidebar from '@/components/Sidebar/Sidebar'
import SidebarPanel from '@/components/Sidebar/SidebarPanel'
import Editor from '@/components/Editor/Editor'
import MessageSpacer from '@/components/ui/MessageSpacer'
import NewNoteFAB from '@/components/ui/NewNoteFAB'
import Logo from '@/components/ui/Logo'
import { useUI } from '@/context/ui'
import { useNotes } from '@/context/notes'
import { pushKey, isTriggered, setTriggered } from '@/utils/typeaheadBuffer'
import styles from './index.styles'

/* ── Typeahead: start typing anywhere to create a note ──────── */

const useTypeahead = () => {
  const { noteOpen, openNotePane } = useUI()
  const { addNote } = useNotes()

  // Keep a ref so the keydown closure always sees the latest value
  const noteOpenRef = useRef(noteOpen)
  useEffect(() => { noteOpenRef.current = noteOpen }, [noteOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Never intercept when a modifier key is held
      if (e.ctrlKey || e.altKey || e.metaKey) return

      // If the focus is already inside an input / textarea, let it
      // handle the event natively — don't double‑process.
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      // If a note pane is already open, don't create another one
      if (noteOpenRef.current) return

      if (!isTriggered()) {
        // Only alphabetic keys (with optional Shift) trigger creation
        if (!/^[a-zA-Z]$/.test(e.key)) return

        e.preventDefault()
        pushKey(e.key)
        setTriggered()
        addNote()
        openNotePane({ focusBody: true })
      } else {
        // Note creation already triggered — keep buffering printable chars
        if (e.key.length === 1) {
          e.preventDefault()
          pushKey(e.key)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [addNote, openNotePane])
}

/* ── Home screen ────────────────────────────────────────────── */

const Home = () => {
  useTypeahead()

  const { width } = useWindowDimensions()
  const isMobile = width <= MOBILE_BREAKPOINT
  const isTablet = width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT

  return (
    <View style={styles.outer}>
      <Topbar />
      <TopbarPanel />
      <MessageSpacer />
      <NewNoteFAB />
      <Logo />
      <View style={styles.content}>
        <Sidebar isMobile={isMobile} isTablet={isTablet} />
        <Editor fileName="newmarkdown.md" />
      </View>
      <SidebarPanel />
    </View>
  )
}

export default Home