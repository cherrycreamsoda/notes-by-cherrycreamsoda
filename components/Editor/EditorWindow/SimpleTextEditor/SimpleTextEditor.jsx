import { useRef, useEffect } from 'react'
import { View, TextInput } from 'react-native'
import { useNotes } from '@/context/notes'
import { useUI } from '@/context/ui'
import { flush } from '@/utils/typeaheadBuffer'
import styles from './SimpleTextEditor.styles'

const SimpleTextEditor = () => {
  const { activeNote, updateNote } = useNotes()
  const { focusTitle, setFocusTitle, focusBody, setFocusBody } = useUI()
  const titleRef = useRef(null)
  const bodyRef = useRef(null)
  const hasFlushed = useRef(false)

  /* ── Flush typeahead buffer on mount ─────────────────────── */
  useEffect(() => {
    if (!activeNote || hasFlushed.current) return
    hasFlushed.current = true

    const buffered = flush()
    if (buffered) {
      updateNote(activeNote.id, { body: buffered })
    }
  }, [activeNote])

  /* ── Focus handling ──────────────────────────────────────── */
  useEffect(() => {
    if (focusTitle) {
      titleRef.current?.focus()
      setFocusTitle(false)
    }
  }, [focusTitle])

  useEffect(() => {
    if (focusBody) {
      bodyRef.current?.focus()
      setFocusBody(false)
    }
  }, [focusBody])

  /* Reset hasFlushed when note changes */
  useEffect(() => {
    hasFlushed.current = false
  }, [activeNote?.id])

  if (!activeNote) return null

  const handleTitleChange = (text) => updateNote(activeNote.id, { title: text })
  const handleBodyChange = (text) => updateNote(activeNote.id, { body: text })

  return (
    <View style={styles.container}>
      <TextInput
        ref={titleRef}
        style={styles.title}
        value={activeNote.title}
        onChangeText={handleTitleChange}
        placeholder="Title"
        placeholderTextColor="#3a3a3a"
        onSubmitEditing={() => bodyRef.current?.focus()}
        returnKeyType="next"
      />
      <TextInput
        ref={bodyRef}
        style={styles.body}
        value={activeNote.body}
        onChangeText={handleBodyChange}
        placeholder="Start writing..."
        placeholderTextColor="#3a3a3a"
        multiline
        textAlignVertical="top"
      />
    </View>
  )
}

export default SimpleTextEditor
