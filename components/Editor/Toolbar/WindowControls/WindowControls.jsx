import { View, useWindowDimensions } from 'react-native'
import { MOBILE_BREAKPOINT } from '@/constants/theme'
import SidebarToggle from './SidebarToggle'
import TopbarToggle from './TopbarToggle'
import ExportFile from './ExportFile'
import LockToggle from './LockToggle'
import PinToggle from './PinToggle'
import Delete from './Delete'
import FileName from './FileName'
import styles from './WindowControls.styles'

const WindowControls = () => {
  const { width } = useWindowDimensions()
  const isMobile = width <= MOBILE_BREAKPOINT

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <SidebarToggle />
        <TopbarToggle />
      </View>

      <FileName />

      <View style={styles.right}>
        {!isMobile && <ExportFile />}
        <LockToggle />
        <PinToggle />
        <Delete />
      </View>
    </View>
  )
}

export default WindowControls
