import { View } from 'react-native'
import WindowControls from './WindowControls/WindowControls'
import EditorControls from './EditorControls/EditorControls'
import styles from './EditorToolbar.styles'

const EditorToolbar = ({ fileName }) => {
  return (
    <View style={styles.toolbar}>
      <WindowControls fileName={fileName} />
      <EditorControls />
    </View>
  )
}

export default EditorToolbar
