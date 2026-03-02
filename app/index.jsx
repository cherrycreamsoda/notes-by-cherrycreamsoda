import {
  View,
  useWindowDimensions,
} from 'react-native'
import { useRef, useEffect, useState, useCallback } from 'react'
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/theme'
import Topbar from '@/components/Topbar/Topbar'
import TopbarPanel from '@/components/Topbar/TopbarPanel'
import Sidebar from '@/components/Sidebar/Sidebar'
import SidebarPanel from '@/components/Sidebar/SidebarPanel'
import Editor from '@/components/Editor/Editor'
import MessageSpacer from '@/components/ui/MessageSpacer'
import NewNoteFAB from '@/components/ui/NewNoteFAB'
import Logo from '@/components/ui/Logo'
import ImportOverlay from '@/components/ui/ImportOverlay'
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

/* ── File drag-and-drop import ───────────────────────────────── */

const useFileDrop = () => {
  const { openNotePane } = useUI()
  const { importNote } = useNotes()
  const [dragOver, setDragOver] = useState(false)
  const [dragFileName, setDragFileName] = useState('')
  const dragCounter = useRef(0)

  useEffect(() => {
    const onDragEnter = (e) => {
      e.preventDefault()
      dragCounter.current++
      if (dragCounter.current === 1) {
        setDragOver(true)
        // Try to grab the file name from the drag event
        const item = e.dataTransfer?.items?.[0]
        if (item?.kind === 'file') {
          // getAsFile() may return null during dragenter on some browsers,
          // so we also check dataTransfer.files on drop.
          const file = item.getAsFile?.()
          setDragFileName(file?.name ?? 'file')
        }
      }
    }

    const onDragOver = (e) => {
      e.preventDefault() // required to allow drop
    }

    const onDragLeave = (e) => {
      e.preventDefault()
      dragCounter.current--
      if (dragCounter.current <= 0) {
        dragCounter.current = 0
        setDragOver(false)
        setDragFileName('')
      }
    }

    const onDrop = (e) => {
      e.preventDefault()
      dragCounter.current = 0
      setDragOver(false)
      setDragFileName('')

      const file = e.dataTransfer?.files?.[0]
      if (!file) return

      // Only accept text-based files
      const reader = new FileReader()
      reader.onload = () => {
        const content = reader.result
        importNote(file.name, content)
        openNotePane({ focusBody: true })
      }
      reader.readAsText(file)
    }

    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('drop', onDrop)

    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('drop', onDrop)
    }
  }, [importNote, openNotePane])

  return { dragOver, dragFileName }
}

/* ── Home screen ────────────────────────────────────────────── */

const Home = () => {
  useTypeahead()
  const { dragOver, dragFileName } = useFileDrop()

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
        <Editor />
      </View>
      <SidebarPanel />
      <ImportOverlay visible={dragOver} fileName={dragFileName} />
    </View>
  )
}

export default Home