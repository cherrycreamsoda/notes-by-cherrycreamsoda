import { View } from 'react-native'
import EditorToolbar from './Toolbar/EditorToolbar'
import styles from './Editor.styles'

const Editor = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen, fileName }) => {
  return (
    <View style={styles.editor}>
      <EditorToolbar
        onToggleSidebar={onToggleSidebar}
        onToggleTopbar={onToggleTopbar}
        sidebarOpen={sidebarOpen}
        topbarOpen={topbarOpen}
        fileName={fileName}
      />
      <View style={styles.editorContent} />
    </View>
  )
}

export default Editor
