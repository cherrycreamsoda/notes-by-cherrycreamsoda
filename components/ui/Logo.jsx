import { View, Text, useWindowDimensions } from 'react-native'
import { TABLET_BREAKPOINT } from '@/constants/theme'
import { useAppState } from '@/context/AppContext'
import styles from './Logo.styles'

const Logo = () => {
  const { sidebarOpen, topbarOpen } = useAppState()
  const { width } = useWindowDimensions()
  const isDesktop = width > TABLET_BREAKPOINT

  return (
    <View
      style={[
        styles.container,
        isDesktop ? styles.containerDesktop : styles.containerCompact,
        isDesktop && sidebarOpen && styles.containerShifted,
        !isDesktop && !topbarOpen && styles.containerTopbarClosed,
      ]}
    >
      <Text
        style={[
          styles.text,
          isDesktop && styles.textDesktop,
        ]}
        numberOfLines={1}
      >
        notes.
      </Text>
    </View>
  )
}

export default Logo
