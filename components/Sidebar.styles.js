import { StyleSheet } from 'react-native'
import { SIDEBAR_WIDTH } from '@/constants/theme'
import { colors } from '@/constants/theme'
import { webTransition } from '@/utils/styles'

export default StyleSheet.create({
  sidebar: {
    height: '100%',
    width: SIDEBAR_WIDTH,
    backgroundColor: colors.background,
    overflow: 'hidden',
    ...webTransition('width'),
  },

  sidebarTablet: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 20,
  },

  sidebarClosed: {
    width: 0,
  },
})
