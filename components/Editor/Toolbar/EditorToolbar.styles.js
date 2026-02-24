import { StyleSheet } from 'react-native'
import { EDITOR_TOOLBAR_TOP_ROW, EDITOR_TOOLBAR_BOTTOM_ROW, colors } from '@/constants/theme'

export default StyleSheet.create({
  toolbar: {
    height: EDITOR_TOOLBAR_TOP_ROW + EDITOR_TOOLBAR_BOTTOM_ROW,
    width: '100%',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
})
