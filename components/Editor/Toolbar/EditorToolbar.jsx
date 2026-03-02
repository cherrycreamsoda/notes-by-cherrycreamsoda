import { View } from 'react-native'
import WindowControls from './WindowControls/WindowControls'
import EditorControls from './EditorControls/EditorControls'
import styles from './EditorToolbar.styles'

const EditorToolbar = () => {
  return (
    <View style={styles.toolbar}>
      <WindowControls />
      <EditorControls />
    </View>
  )
}

export default EditorToolbar
