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

  topRow: {
    height: EDITOR_TOOLBAR_TOP_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },

  topRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 2,
  },

  topRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 6,
    
  },

  bottomRow: {
    height: EDITOR_TOOLBAR_BOTTOM_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  iconBtn: {
  },
})
