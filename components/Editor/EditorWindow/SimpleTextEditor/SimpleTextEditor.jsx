import { View, TextInput } from 'react-native'
import { useNotes } from '@/context/notes'
import { useUI } from '@/context/ui'
import { useRef, useEffect } from 'react'
import styles from './SimpleTextEditor.styles'

const SimpleTextEditor = () => {
  const { activeNote, updateNote } = useNotes()
  const { focusTitle, setFocusTitle } = useUI()
  const titleRef = useRef(null)
  const bodyRef = useRef(null)

  if (!activeNote) return null

  const handleTitleChange = (text) => updateNote(activeNote.id, { title: text })
  const handleBodyChange = (text) => updateNote(activeNote.id, { body: text })

  useEffect(() => {
    if (focusTitle) {
      titleRef.current?.focus()
      setFocusTitle(false)
    }
  }, [focusTitle, setFocusTitle])

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
