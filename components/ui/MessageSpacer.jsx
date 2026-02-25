import { View, useWindowDimensions } from 'react-native'
import { MOBILE_BREAKPOINT } from '@/constants/theme'
import styles from './MessageSpacer.styles'

const MessageSpacer = () => {
  const { width } = useWindowDimensions()
  const isMobile = width <= MOBILE_BREAKPOINT

  return (
    <View style={styles.wrapper}>
      <View style={[styles.handle, isMobile && styles.handleMobile]} />
    </View>
  )
}

export default MessageSpacer
