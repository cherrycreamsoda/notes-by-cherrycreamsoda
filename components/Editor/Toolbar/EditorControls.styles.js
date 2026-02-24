import { StyleSheet } from 'react-native'
import { EDITOR_TOOLBAR_BOTTOM_ROW, colors } from '@/constants/theme'

export default StyleSheet.create({
  container: {
    height: EDITOR_TOOLBAR_BOTTOM_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingBottom: 8,
    paddingTop: 0,
    gap: 8,
  },

  dropdownWrapper: {
    position: 'relative',
  },

  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    gap: 5,
  },

  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#474747',
  },

  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 4,
    zIndex: 50,
    gap: 2,
  },

  dropdownItem: {
    padding: 6,
  },

  iconBtn: {
  },
})
