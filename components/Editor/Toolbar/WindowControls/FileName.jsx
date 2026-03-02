import { View, Text } from 'react-native'
import { useNotes } from '@/context/notes'
import { toFileName } from '@/services/notes'
import styles from './WindowControls.styles'

const FileName = () => {
  const { activeNote } = useNotes()
  const name = toFileName(activeNote)

  return (
    <View style={styles.center}>
      <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
        {name}
      </Text>
    </View>
  )
}

export default FileName
