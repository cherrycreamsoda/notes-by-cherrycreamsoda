import { Text, View, TouchableOpacity } from 'react-native'
import styles from './ControlBar.styles'

const ControlBar = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen }) => {
  return (
    <View style={styles.controls}>
      <TouchableOpacity onPress={onToggleSidebar} style={styles.btn}>
        <Text style={styles.btnText}>{sidebarOpen ? 'Close' : 'Open'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleTopbar} style={styles.btn}>
        <Text style={styles.btnText}>{topbarOpen ? 'Hide Bar' : 'Show Bar'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ControlBar
