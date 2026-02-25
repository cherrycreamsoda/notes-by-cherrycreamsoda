import { StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    outlineStyle: 'none',
    height: 50,
  },

  body: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
    outlineStyle: 'none',
  },
})
