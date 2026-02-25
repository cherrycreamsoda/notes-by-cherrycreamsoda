import { View } from 'react-native'
import { useAppState } from '@/context/AppContext'
import styles from './Sidebar.styles'

const Sidebar = ({ isMobile, isTablet }) => {
  const { sidebarOpen } = useAppState()

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
