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

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingTop: 6,
  },

  iconBtn: {
  },
})
