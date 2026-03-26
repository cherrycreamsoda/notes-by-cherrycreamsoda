import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Platform } from 'react-native'
import Icon from '@/components/Icon/Icon'
import {
  ICON_COLOR,
  ICON_COLOR_ACTIVE_PIN,
  ICON_COLOR_DANGER,
} from '@/constants/theme'
import styles from './SidebarNoteItem.styles'

const isTouch = Platform.OS !== 'web'
const ICON_SZ = 14
const RESTORE_COLOR = '#4a9eff'

/* ── Relative-time formatter ─────────────────────────────── */
const formatModifiedTime = (ts) => {
  const now = Date.now()
  const diff = (now - ts) / 1000 // seconds

  if (diff < 1) return 'just now'

  const SEC = 1, MIN = 60, HOUR = 3600, HALF_DAY = 43200, DAY = 86400
  const WEEK = DAY * 7, FIVE_WEEKS = WEEK * 5, SIX_MONTHS = DAY * 182

  if (diff < MIN) {
    const s = Math.floor(diff)
    return `${s} second${s !== 1 ? 's' : ''} ago`
  }
  if (diff < HOUR) {
    const m = Math.floor(diff / MIN)
    return `${m} minute${m !== 1 ? 's' : ''} ago`
  }
  if (diff < HALF_DAY) {
    const h = (diff / HOUR).toFixed(1).replace(/\.0$/, '')
    return `${h} hours ago`
  }
  if (diff < DAY) {
    const d = new Date(ts)
    const hh = d.getHours() % 12 || 12
    const mm = String(d.getMinutes()).padStart(2, '0')
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
    return `${hh}:${mm} ${ampm}`
  }
  if (diff < WEEK) {
    const days = Math.floor(diff / DAY)
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }
  if (diff < FIVE_WEEKS) {
    const w = (diff / WEEK).toFixed(1).replace(/\.0$/, '')
    return `${w} weeks ago`
  }
  if (diff < SIX_MONTHS) {
    const months = Math.floor(diff / (DAY * 30.44))
    return `more than ${months} month${months !== 1 ? 's' : ''} ago`
  }

  // Older than 6 months: full timestamp
  const d = new Date(ts)
  const hh = d.getHours() % 12 || 12
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
  const dd = String(d.getDate()).padStart(2, '0')
  const mo = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${hh}:${mm}:${ss} ${ampm} ${dd}/${mo}/${yyyy}`
}

/**
 * A single note row inside the sidebar note list.
 *
 * Layout:
 *   [lock]  Title               [pin/restore] [delete]
 *           line 1 of body…
 *           line 2 of body…
 *
 * - Lock icon shows filled when locked, open when unlocked.
 * - Pin and delete buttons are invisible until the row is hovered,
 *   EXCEPT pin stays visible (yellow) when the note is pinned.
 * - Pin glows yellow when active; delete glows red on hover.
 * - In deleted view: restore button replaces pin button.
 */
const SidebarNoteItem = ({
  note,
  isSelected,
  isDeletedView,
  onSelect,
  onTogglePin,
  onRestore,
  onToggleLock,
  onDelete,
}) => {
  const [hovered, setHovered] = useState(false)
  const [deleteHovered, setDeleteHovered] = useState(false)
  const [, tick] = useState(0)

  // Re-render every 15 s so the relative time stays fresh
  useEffect(() => {
    const id = setInterval(() => tick(n => n + 1), 15000)
    return () => clearInterval(id)
  }, [])

  const { title, body, pinned, locked, updatedAt } = note

  // First two lines of the body for the preview
  const previewLines = (body || '')
    .split('\n')
    .filter(l => l.trim() !== '')
    .slice(0, 2)
    .join('\n')

  // Icons visible when hovered, or pin visible when pinned
  const showActions = isTouch || hovered
  const showPin = showActions || pinned

  const pinColor = pinned ? ICON_COLOR_ACTIVE_PIN : ICON_COLOR
  const deleteColor = (isTouch || deleteHovered) ? ICON_COLOR_DANGER : ICON_COLOR

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={[styles.item, isSelected && styles.itemSelected]}
    >
      {/* Lock icon */}
      <View style={styles.lockCol}>
        <TouchableOpacity onPress={onToggleLock} hitSlop={6}>
          <Icon
            name={locked ? 'lockFilled' : 'lockOpen'}
            size={ICON_SZ}
            color={hovered || isTouch ? ICON_COLOR : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      {/* Title + preview */}
      <View style={styles.textCol}>
        <Text style={styles.title} numberOfLines={1}>
          {title || 'Untitled'}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {previewLines || ' '}
        </Text>
      </View>

      {/* Modified time — bottom-right */}
      {updatedAt != null && (
        <Text style={styles.timeLabel}>{formatModifiedTime(updatedAt)}</Text>
      )}

      {/* Pin/Restore + Delete */}
      <View style={styles.actionsCol}>
        {isDeletedView ? (
          /* Deleted view: show restore button instead of pin */
          showActions ? (
            <TouchableOpacity
              onPress={onRestore}
              style={styles.actionButton}
              hitSlop={6}
            >
              <Icon name="restore" size={ICON_SZ} color={RESTORE_COLOR} />
            </TouchableOpacity>
          ) : (
            <View style={[styles.actionButton, { width: ICON_SZ, height: ICON_SZ }]} />
          )
        ) : (
          /* Normal view: show pin button */
          showPin ? (
            <TouchableOpacity
              onPress={onTogglePin}
              style={styles.actionButton}
              hitSlop={6}
            >
              <Icon name="pushPin" size={ICON_SZ} color={pinColor} />
            </TouchableOpacity>
          ) : (
            <View style={[styles.actionButton, { width: ICON_SZ, height: ICON_SZ }]} />
          )
        )}

        {showActions ? (
          <TouchableOpacity
            onPress={onDelete}
            style={styles.actionButton}
            hitSlop={6}
            onMouseEnter={() => setDeleteHovered(true)}
            onMouseLeave={() => setDeleteHovered(false)}
          >
            <Icon name="deleteForever" size={ICON_SZ} color={deleteColor} />
          </TouchableOpacity>
        ) : (
          <View style={[styles.actionButton, { width: ICON_SZ, height: ICON_SZ }]} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default SidebarNoteItem
