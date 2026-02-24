import { StyleSheet } from 'react-native'
import { EDITOR_TOOLBAR_TOP_ROW, colors } from '@/constants/theme'

export default StyleSheet.create({
  container: {
    height: EDITOR_TOOLBAR_TOP_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 2,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  fileName: {
    color: colors.textMuted,
    fontSize: 13,
    userSelect: 'none',
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 6,
  },
})
