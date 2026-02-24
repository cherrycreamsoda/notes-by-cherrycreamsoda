import { View } from 'react-native'
import WindowControls from './WindowControls'
import EditorControls from './EditorControls'
import styles from './EditorToolbar.styles'

const EditorToolbar = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen }) => {
  return (
    <View style={styles.toolbar}>
      <WindowControls
        onToggleSidebar={onToggleSidebar}
        onToggleTopbar={onToggleTopbar}
        sidebarOpen={sidebarOpen}
        topbarOpen={topbarOpen}
      />
      <EditorControls />
    </View>
  )
}

export default EditorToolbar
