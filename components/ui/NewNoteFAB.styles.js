import { StyleSheet } from 'react-native'

export const DESKTOP_OPEN = 40
export const DESKTOP_CLOSED = 30
export const COMPACT = 80

const ICON_RATIO = 0.45
export const ICON_DESKTOP_OPEN = Math.round(DESKTOP_OPEN * ICON_RATIO)
export const ICON_COMPACT = Math.round(COMPACT * ICON_RATIO)

export default StyleSheet.create({
  // ── base ──────────────────────────────────────────────
  fab: {
    position: 'absolute',
    zIndex: 30,
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // ── desktop position ─────────────────────────────────
  desktopPosition: {
    top: 10,
    left: 9,
  },

  // ── compact (tablet / mobile) ────────────────────────
  compact: {
    bottom: 60,
    width: COMPACT,
    height: COMPACT,
    borderRadius: COMPACT / 2,
  },
})
