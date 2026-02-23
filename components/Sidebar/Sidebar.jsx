import { View } from 'react-native'
import styles from './Sidebar.styles'

const Sidebar = ({ isOpen, isTablet }) => {
  return (
    <View
      style={[
        styles.sidebar,
        isTablet && styles.sidebarTablet,
        !isOpen && styles.sidebarClosed,
      ]}
    />
  )
}

export default Sidebar
