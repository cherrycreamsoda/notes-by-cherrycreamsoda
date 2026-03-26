import { useRef, useEffect, useState, useCallback } from 'react'
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native'
import { SMALL_DESKTOP_BREAKPOINT } from '@/constants/theme'
import { useNotifications } from '@/context/notifications'
import Icon from '@/components/Icon/Icon'
import styles from './MessageSpacer.styles'

/* ── Clock time: "14:30" ──────────────────────────────────── */

const clockTime = (ts) => {
  const d = new Date(ts)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

/* ── Single notification row ──────────────────────────────── */

const NotificationRow = ({ notification, onDismiss }) => {
  const { type, title, body, timestamp, action } = notification
  const isAlert = type === 'error' || type === 'alert'

  // Merge title + body into one flowing sentence
  const text = body
    ? `${title}, ${body.charAt(0).toLowerCase()}${body.slice(1)}`
    : title

  return (
    <View style={[styles.row, isAlert && styles.rowAlert]}>
      <Text style={[styles.rowText, isAlert && { color: '#af0000' }]}>
        {text}{' '}
        <Text style={[styles.rowTime, isAlert && { color: '#e3e3e3' }]}>{clockTime(timestamp)}</Text>
      </Text>
      {action && (
        <TouchableOpacity onPress={action.onPress} style={styles.actionButton}>
          <Text style={[styles.actionText, isAlert && styles.actionTextAlert]}>
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <Icon name="closeFile" size={12} color={isAlert ? '#af0000' : '#555'} />
      </TouchableOpacity>
    </View>
  )
}

/* ── MessageSpacer ────────────────────────────────────────── */

/**
 * A thin handle-line at the top of the content area.
 *
 * When the notification panel opens:
 *   1. Handle slides up 8 px          (200 ms)
 *   2. A box expands below the handle (350 ms)
 *
 * On close the reverse happens:
 *   1. Box collapses                  (250 ms)
 *   2. Handle slides back down        (200 ms)
 *
 * The box shares the handle's width (200 px) and grows
 * to fit however many notification rows are inside.
 */
const MessageSpacer = () => {
  const { width, height: vh } = useWindowDimensions()
  const isSmall = width <= SMALL_DESKTOP_BREAKPOINT
  const spacerWidth = vh * 0.7
  const {
    panelOpen,
    notifications,
    markAllRead,
    dismissNotification,
    closePanel,
  } = useNotifications()
  const containerRef = useRef(null)

  /* ── debounce close to absorb close→reopen races ─────
   *
   * When clicking a toolbar button that triggers an error:
   *   mousedown → click-outside fires → closePanel (panelOpen=false)
   *   onPress   → addNotification     → openPanel  (panelOpen=true)
   *
   * These are separate event cycles so React doesn't batch them.
   * panelOpen bounces false→true, causing a visible close/reopen.
   *
   * Fix: derive stableOpen that follows panelOpen immediately
   * for opens, but delays 100 ms for closes.  If panelOpen
   * bounces back within that window the close is cancelled.
   * ───────────────────────────────────────────────────────── */
  const [stableOpen, setStableOpen] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    if (panelOpen) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
        closeTimer.current = null
      }
      setStableOpen(true)
    } else {
      closeTimer.current = setTimeout(() => {
        setStableOpen(false)
        closeTimer.current = null
      }, 100)
    }
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
        closeTimer.current = null
      }
    }
  }, [panelOpen])

  /* ── close panel when clicking outside (web) ─────────── */
  useEffect(() => {
    if (Platform.OS !== 'web' || !stableOpen) return
    const handleClick = (e) => {
      if (containerRef.current && containerRef.current.contains(e.target)) return
      if (e.target.closest && e.target.closest('[data-notification-toggle]')) return
      closePanel()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [stableOpen, closePanel])

  /* ── animated values ─────────────────────────────────── */
  const translateY = useRef(new Animated.Value(0)).current
  const boxHeight  = useRef(new Animated.Value(0)).current
  const isOpen     = useRef(false)

  /* ── measure inner content so we animate to exact height */
  const [contentH, setContentH] = useState(0)
  const onContentLayout = useCallback((e) => {
    setContentH(e.nativeEvent.layout.height)
  }, [])

  /* ── main open / close sequencer ───────────────────── */
  useEffect(() => {
    /* Stop any in-flight animations so they can't collide */
    translateY.stopAnimation()
    boxHeight.stopAnimation()

    if (stableOpen && !isOpen.current) {
      isOpen.current = true

      if (notifications.some(n => !n.read)) markAllRead()

      if (isSmall) {
        Animated.timing(boxHeight, {
          toValue: contentH || 32, duration: 300, useNativeDriver: false,
        }).start()
      } else {
        Animated.sequence([
          Animated.timing(translateY, { toValue: -8, duration: 200, useNativeDriver: false }),
          Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: false }),
          Animated.timing(boxHeight, { toValue: contentH || 32, duration: 350, useNativeDriver: false }),
        ]).start()
      }
    } else if (!stableOpen && isOpen.current) {
      isOpen.current = false

      if (isSmall) {
        Animated.timing(boxHeight, {
          toValue: 0, duration: 250, useNativeDriver: false,
        }).start()
      } else {
        Animated.sequence([
          Animated.timing(boxHeight, { toValue: 0, duration: 250, useNativeDriver: false }),
          Animated.timing(translateY, { toValue: -8, duration: 200, useNativeDriver: false }),
          Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: false }),
        ]).start()
      }
    }
  }, [stableOpen])

  /* ── instant resize if content changes while open ──── */
  useEffect(() => {
    if (isOpen.current && contentH > 0) {
      boxHeight.setValue(contentH)
    }
  }, [contentH])

  /* ── Notification content (shared between both layouts) */
  const notificationContent = (
    <View onLayout={onContentLayout} style={styles.boxInner}>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications</Text>
      ) : (
        notifications.map(n => (
          <NotificationRow
            key={n.id}
            notification={n}
            onDismiss={() => dismissNotification(n.id)}
          />
        ))
      )}
    </View>
  )

  /* ── Small screen: full-width panel from top ─────────── */
  if (isSmall) {
    return (
      <Animated.View ref={containerRef} style={[styles.topPanel, { height: boxHeight }]}>
        {notificationContent}
      </Animated.View>
    )
  }

  /* ── Wide screen: centered handle + box ──────────────── */
  return (
    <Animated.View
      ref={containerRef}
      style={[
        styles.wrapper,
        { transform: [{ translateX: -spacerWidth / 2 }, { translateY }] },
      ]}
    >
      {/* Handle line */}
      <View style={[styles.handle, { width: spacerWidth }]} />

      {/* Notification box (overlaps handle from top) */}
      <Animated.View
        style={[
          styles.box,
          { height: boxHeight, width: spacerWidth },
        ]}
      >
        {notificationContent}
      </Animated.View>
    </Animated.View>
  )
}

export default MessageSpacer
