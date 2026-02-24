import { View } from 'react-native'
import WindowControls from './WindowControls/WindowControls'
import EditorControls from './EditorControls/EditorControls'
import styles from './EditorToolbar.styles'

const EditorToolbar = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen, fileName }) => {
  return (
    <View style={styles.toolbar}>
      <WindowControls
        onToggleSidebar={onToggleSidebar}
        onToggleTopbar={onToggleTopbar}
        sidebarOpen={sidebarOpen}
        topbarOpen={topbarOpen}
        fileName={fileName}
      />
      <EditorControls />
    </View>
  )
}

export default EditorToolbar
