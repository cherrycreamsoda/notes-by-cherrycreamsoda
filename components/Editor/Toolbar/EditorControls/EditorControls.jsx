import { View } from 'react-native'
import Preview from './Preview'
import EditorTypeChanger from './EditorTypeChanger'
import Close from './Close'
import styles from './EditorControls.styles'

const EditorControls = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Preview />
        <EditorTypeChanger />
      </View>

      <View style={styles.right}>
        <Close />
      </View>
    </View>
  )
}

export default EditorControls
