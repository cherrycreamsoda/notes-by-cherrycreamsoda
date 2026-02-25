import { View } from 'react-native'
import { useUI } from '@/context/ui'
import styles from './Topbar.styles'

const Topbar = () => {
  const { topbarOpen } = useUI()

  return (
    <View style={[styles.topbar, !topbarOpen && styles.topbarClosed]} />
  )
}

export default Topbar
