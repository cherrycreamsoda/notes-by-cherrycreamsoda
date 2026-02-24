import { View } from 'react-native'
import Preview from './Preview'
import EditorTypeChanger from './EditorTypeChanger'
import styles from './EditorControls.styles'

const EditorControls = () => {
  return (
    <View style={styles.container}>
      <Preview />
      <EditorTypeChanger />
    </View>
  )
}

export default EditorControls
