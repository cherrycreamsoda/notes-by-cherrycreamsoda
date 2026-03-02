import { View, Text } from 'react-native'
import Icon from '@/components/Icon/Icon'
import styles from './ImportOverlay.styles'

/**
 * Full-screen overlay shown while a file is being dragged over the app.
 *
 * Props
 *   visible   – whether to render the overlay
 *   fileName  – name of the file being dragged (for preview)
 */
const ImportOverlay = ({ visible, fileName }) => {
  if (!visible) return null

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="fileImport" size={48} color="#cccccc" />
        </View>
        <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
          {fileName || 'Drop file to import'}
        </Text>
      </View>
    </View>
  )
}

export default ImportOverlay
