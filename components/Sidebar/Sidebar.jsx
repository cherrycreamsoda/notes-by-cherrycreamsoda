import { View } from 'react-native'
import { useUI } from '@/context/ui'
import styles from './Sidebar.styles'

const Sidebar = ({ isMobile, isTablet }) => {
  const { sidebarOpen } = useUI()

  const closedStyle = isMobile || isTablet
    ? styles.sidebarClosedCompact
    : styles.sidebarClosedDesktop

  return (
    <View
      style={[
        styles.sidebar,
        isMobile && styles.sidebarMobile,
        !sidebarOpen && closedStyle,
      ]}
    />
  )
}

export default Sidebar
