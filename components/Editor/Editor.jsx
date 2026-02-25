import { View } from 'react-native'
import EditorToolbar from './Toolbar/EditorToolbar'
import styles from './Editor.styles'

const Editor = ({ fileName }) => {
  return (
    <View style={styles.editor}>
      <EditorToolbar fileName={fileName} />
      <View style={styles.editorContent} />
    </View>
  )
}

export default Editor
