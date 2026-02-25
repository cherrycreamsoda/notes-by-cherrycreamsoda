import { StyleSheet } from 'react-native'
import { TOPBAR_HEIGHT } from '@/constants/theme'
import { webTransition } from '@/utils/styles'

export default StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: TOPBAR_HEIGHT,
    zIndex: 25,
    ...webTransition('top, opacity'),
  },

  panelClosed: {
    top: -TOPBAR_HEIGHT,
    opacity: 0,
  },

  inner: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 8,
    gap: 10,
  },
})
