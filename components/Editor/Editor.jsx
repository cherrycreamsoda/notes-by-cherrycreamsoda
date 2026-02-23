import { View } from 'react-native'
import EditorToolbar from './Toolbar/EditorToolbar'
import styles from './Editor.styles'

const Editor = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen }) => {
  return (
    <View style={styles.editor}>
      <EditorToolbar
        onToggleSidebar={onToggleSidebar}
        onToggleTopbar={onToggleTopbar}
        sidebarOpen={sidebarOpen}
        topbarOpen={topbarOpen}
      />
      <View style={styles.editorContent} />
    </View>
  )
}

export default Editor
