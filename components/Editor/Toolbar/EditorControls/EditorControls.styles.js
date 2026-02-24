import { StyleSheet } from 'react-native'
import { EDITOR_TOOLBAR_BOTTOM_ROW } from '@/constants/theme'

export default StyleSheet.create({
  container: {
    height: EDITOR_TOOLBAR_BOTTOM_ROW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 9,
    paddingBottom: 8,
    paddingTop: 0,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
})
