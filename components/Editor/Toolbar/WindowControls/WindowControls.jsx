import { View } from 'react-native'
import SidebarToggle from './SidebarToggle'
import TopbarToggle from './TopbarToggle'
import ImportFile from './ImportFile'
import ExportFile from './ExportFile'
import LockToggle from './LockToggle'
import PinToggle from './PinToggle'
import Delete from './Delete'
import styles from './WindowControls.styles'

const WindowControls = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <SidebarToggle onPress={onToggleSidebar} isOpen={sidebarOpen} />
        <TopbarToggle onPress={onToggleTopbar} isOpen={topbarOpen} />
      </View>

      <View style={styles.right}>
        <ImportFile />
        <ExportFile />
        <LockToggle />
        <PinToggle />
        <Delete />
      </View>
    </View>
  )
}

export default WindowControls
