import { StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
})
