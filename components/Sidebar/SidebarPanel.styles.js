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

  navButtonDanger: {
    backgroundColor: '#510000',
    borderWidth: 1,
    borderColor: '#af0000',
  },

  navButtonTextDanger: {
    color: '#af0000',
  },

  notesInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
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

  notesListContent: {
    paddingTop: 4,
    paddingBottom: 12,
    gap: 0,
  },

  noteSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 4,
  },

  navSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
})
