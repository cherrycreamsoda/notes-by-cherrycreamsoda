import { StyleSheet } from 'react-native'
import { TOPBAR_HEIGHT, colors } from '@/constants/theme'
import { webTransition } from '@/utils/animation'

export default StyleSheet.create({
  topbar: {
    width: '100%',
    height: TOPBAR_HEIGHT,
    backgroundColor: colors.background,
    overflow: 'hidden',
    ...webTransition('height'),
  },

  topbarClosed: {
    height: 0,
  },
})
