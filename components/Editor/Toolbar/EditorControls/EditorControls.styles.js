import { StyleSheet } from 'react-native'
import { EDITOR_TOOLBAR_BOTTOM_ROW } from '@/constants/theme'

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
})
