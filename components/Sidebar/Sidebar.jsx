import { View } from 'react-native'
import styles from './Sidebar.styles'

const Sidebar = ({ isOpen, isMobile, isTablet }) => {
  const closedStyle = isMobile || isTablet
    ? styles.sidebarClosedCompact
    : styles.sidebarClosedDesktop

  return (
    <View
      style={[
        styles.sidebar,
        isMobile && styles.sidebarMobile,
        !isOpen && closedStyle,
      ]}
    />
  )
}

export default Sidebar
