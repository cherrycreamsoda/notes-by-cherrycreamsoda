import { View } from 'react-native'
import EditorToolbar from './Toolbar/EditorToolbar'
import EditorWindow from './EditorWindow/EditorWindow'
import styles from './Editor.styles'

const Editor = () => {
  return (
    <View style={styles.editor}>
      <EditorToolbar />
      <View style={styles.editorContent}>
        <EditorWindow />
      </View>
    </View>
  )
}

export default Editor
