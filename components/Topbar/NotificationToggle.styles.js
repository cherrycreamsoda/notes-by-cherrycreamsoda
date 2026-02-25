import { StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  container: {
    position: 'relative',
  },

  alertDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.alert,
  },
})
