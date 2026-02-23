import { View } from 'react-native'
import styles from './Topbar.styles'

const Topbar = ({ isOpen }) => {
  return (
    <View style={[styles.topbar, !isOpen && styles.topbarClosed]} />
  )
}

export default Topbar
