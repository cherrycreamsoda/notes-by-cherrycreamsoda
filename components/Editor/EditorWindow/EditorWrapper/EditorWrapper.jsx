import { ScrollView } from 'react-native'
import styles from './EditorWrapper.styles'

const EditorWrapper = ({ children }) => {
  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  )
}

export default EditorWrapper
