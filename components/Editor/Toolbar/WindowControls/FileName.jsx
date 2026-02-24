import { View, Text } from 'react-native'
import styles from './WindowControls.styles'

const FileName = ({ name = 'untitled.md' }) => {
  return (
    <View style={styles.center}>
      <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
        {name}
      </Text>
    </View>
  )
}

export default FileName
