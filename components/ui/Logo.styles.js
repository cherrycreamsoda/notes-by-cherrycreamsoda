import { StyleSheet, Platform } from 'react-native'
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  TOPBAR_HEIGHT,
  ICON_COLOR
} from '@/constants/theme'
import { webTransition } from '@/utils/animation'

// FAB is 40px tall at top:0, logo sits below it with a small gap
const FAB_SIZE = 40
const LOGO_TOP = FAB_SIZE + 8

export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 28,
    pointerEvents: 'none',
    ...webTransition('left, opacity, top'),
  },

  containerDesktop: {
    bottom: 8,
    left: 2,
    width: SIDEBAR_COLLAPSED_WIDTH,
    alignItems: 'center',
  },

  containerShifted: {
    left: SIDEBAR_WIDTH - SIDEBAR_COLLAPSED_WIDTH,
    opacity: 0,
  },

  containerTopbarClosed: {
    top: 6 - TOPBAR_HEIGHT,
  },

  containerCompact: {
    top: 6,
    left: 12,
    height: TOPBAR_HEIGHT,
    justifyContent: 'center',
  },

  text: {
    color: ICON_COLOR,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 2,
    userSelect: 'none',
  },

  textDesktop: Platform.select({
    web: {
      writingMode: 'vertical-rl',
      textOrientation: 'mixed',
    },
    default: {
      position: 'absolute',
      width: 120,
      textAlign: 'center',
      transform: [{ rotate: '90deg' }],
    },
  }),
})
