import { StyleSheet } from 'react-native'
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH, colors } from '@/constants/theme'
import { webTransition } from '@/utils/animation'

export default StyleSheet.create({
  sidebar: {
    height: '100%',
    width: SIDEBAR_WIDTH,
    backgroundColor: colors.background,
    overflow: 'hidden',
    ...webTransition('width'),
  },

  sidebarMobile: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 20,
  },

  sidebarClosedDesktop: {
    width: SIDEBAR_COLLAPSED_WIDTH,
  },

  sidebarClosedCompact: {
    width: 0,
  },
})
