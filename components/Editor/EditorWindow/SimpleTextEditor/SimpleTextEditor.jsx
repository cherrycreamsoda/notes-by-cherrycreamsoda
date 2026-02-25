import { View, TextInput } from 'react-native'
import { useNotes } from '@/context/notes'
import styles from './SimpleTextEditor.styles'

const SimpleTextEditor = () => {
  const { activeNote, updateNote } = useNotes()

  if (!activeNote) return null

  const handleTitleChange = (text) => {
    updateNote(activeNote.id, { title: text })
  }

  const handleBodyChange = (text) => {
    updateNote(activeNote.id, { body: text })
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={activeNote.title}
        onChangeText={handleTitleChange}
        placeholder="Title"
        placeholderTextColor="#3a3a3a"
        multiline
      />
      <TextInput
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
