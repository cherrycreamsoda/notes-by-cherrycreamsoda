import { StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  /* ── Wrapper (free-floating, auto-width, centered) ── */
  wrapper: {
    position: 'absolute',
    top: 0,
    left: '50%',
    alignItems: 'center',
    paddingTop: 2,
    zIndex: 35,
  },

  /* ── Handle line ────────────────────────────────────── */
  handle: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textMuted,
  },

  handleMobile: {
    /* TODO: mobile positioning */
  },

  /* ── Expandable box (2px below handle, in flow) ────── */
  box: {
    marginTop: 2,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.textMuted,
  },

  boxInner: {
  },

  /* ── Small-screen: full-width panel from top ───────── */
  topPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.textMuted,
    zIndex: 40,
  },

  /* ── Notification row ──────────────────────────────── */
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },

  rowAlert: {
    backgroundColor: '#510000',
  },

  rowText: {
    flex: 1,
    color: colors.textDim,
    fontSize: 11,
    lineHeight: 15,
  },

  rowTime: {
    color: colors.textMuted,
    fontSize: 10,
  },

  actionButton: {
    paddingHorizontal: 4,
    flexShrink: 0,
    marginTop: 1,
  },

  actionText: {
    color: colors.textDim,
    fontSize: 10,
    fontWeight: '600',
  },

  actionTextAlert: {
    color: '#af0000',
  },

  dismissButton: {
    padding: 2,
    flexShrink: 0,
    marginTop: 1,
  },

  emptyText: {
    color: colors.textMuted,
    fontSize: 11,
    paddingHorizontal: 8,
    paddingVertical: 6,
    textAlign: 'center',
  },
})
