import { StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export default StyleSheet.create({
  /* ── Outer row ─────────────────────────────────────────── */
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    height: 76,
    overflow: 'hidden',
    gap: 6,
  },

  itemSelected: {
    backgroundColor: colors.border,
  },

  /* ── Lock icon column (left edge) ──────────────────────── */
  lockCol: {
    width: 14,
    paddingTop: 1,
    alignItems: 'center',
    flexShrink: 0,
  },

  /* ── Text column (title + preview) ─────────────────────── */
  textCol: {
    flex: 1,
    gap: 2,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },

  preview: {
    color: colors.textDim,
    fontSize: 11,
    lineHeight: 14,
    height: 28,
  },

  /* ── Action icons column (right edge) ──────────────────── */
  actionsCol: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingTop: 1,
    flexShrink: 0,
  },

  actionButton: {
    padding: 2,
  },

  /* ── Modified-time label (bottom-right) ────────────────── */
  timeLabel: {
    position: 'absolute',
    bottom: 3,
    right: 6,
    fontSize: 9,
    color: colors.textDim,
    lineHeight: 12,
  },
})
