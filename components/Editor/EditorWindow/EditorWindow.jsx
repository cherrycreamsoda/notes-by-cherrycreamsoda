import { View } from 'react-native'
import { useNotes } from '@/context/notes'
import EditorWrapper from './EditorWrapper/EditorWrapper'
import SimpleTextEditor from './SimpleTextEditor/SimpleTextEditor'
import styles from './EditorWindow.styles'

const editorMap = {
  simpletext: SimpleTextEditor,
}

const EditorWindow = () => {
  const { activeNote } = useNotes()

  if (!activeNote) return <View style={styles.container} />

  const EditorComponent = editorMap[activeNote.type] || SimpleTextEditor

  return (
    <View style={styles.container}>
      <EditorWrapper>
        <EditorComponent />
      </EditorWrapper>
    </View>
  )
}

export default EditorWindow
