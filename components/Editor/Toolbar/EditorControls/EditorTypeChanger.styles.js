import { StyleSheet, Platform } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 50,
    overflow: 'visible',
  },

  trigger: {
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
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 4,
    zIndex: 9999,
    gap: 2,
  },

  dropdownItem: {
    padding: 6,
    borderRadius: 4,
  },

  dropdownItemSelected: {
    backgroundColor: colors.border,
  },

  modalOverlay: {
    flex: 1,
  },
})
