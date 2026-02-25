import { StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    pointerEvents: 'none',
  },

  handle: {
    width: 200,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
  },

  handleMobile: {
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
})
