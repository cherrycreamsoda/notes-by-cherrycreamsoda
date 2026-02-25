import { View } from 'react-native'
import { useAppState } from '@/context/AppContext'
import styles from './Topbar.styles'

const Topbar = () => {
  const { topbarOpen } = useAppState()

  return (
    <View style={[styles.topbar, !topbarOpen && styles.topbarClosed]} />
  )
}

export default Topbar
