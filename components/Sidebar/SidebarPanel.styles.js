import { StyleSheet } from 'react-native'
import { SIDEBAR_WIDTH, TOPBAR_HEIGHT, colors } from '@/constants/theme'
import { webTransition } from '@/utils/animation'

export default StyleSheet.create({
  panel: {
    position: 'absolute',
    top: TOPBAR_HEIGHT,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 25,
    ...webTransition('left, opacity'),
  },

  panelClosed: {
    left: -SIDEBAR_WIDTH,
    opacity: 0,
  },

  inner: {
    flex: 1,
    paddingLeft: 8,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 8,
  },

  innerMobilePadding: {
    paddingRight: 8,
  },

  searchInput: {
    height: 34,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 10,
    color: colors.textPrimary,
    fontSize: 13,
  },

  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  navButtonSelected: {
    backgroundColor: colors.border,
  },

  navButtonText: {
    color: colors.textDim,
    fontSize: 13,
    userSelect: 'none',
  },

  navButtonTextSelected: {
    color: colors.textPrimary,
  },

  notesInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 2,
  },

  notesInfoLabel: {
    color: colors.textMuted,
    fontSize: 12,
    flex: 1,
    userSelect: 'none',
  },

  notesInfoCount: {
    color: colors.textMuted,
    fontSize: 12,
    userSelect: 'none',
  },

  notesList: {
    flex: 1,
  },
})
