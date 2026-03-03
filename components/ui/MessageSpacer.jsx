import { useRef, useEffect, useState, useCallback } from 'react'
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { MOBILE_BREAKPOINT } from '@/constants/theme'
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
  const isMobile = width <= MOBILE_BREAKPOINT
  const spacerWidth = vh * 0.7
  const {
    panelOpen,
    notifications,
    markAllRead,
    dismissNotification,
  } = useNotifications()

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
    if (panelOpen && !isOpen.current) {
      isOpen.current = true

      if (notifications.some(n => !n.read)) markAllRead()

      // Phase 1 → bar up
      Animated.timing(translateY, {
        toValue: -8, duration: 200, useNativeDriver: false,
      }).start(() => {
        // Phase 2 → bar down
        Animated.timing(translateY, {
          toValue: 0, duration: 200, useNativeDriver: false,
        }).start(() => {
          // Phase 3 → panel expands
          Animated.timing(boxHeight, {
            toValue: contentH || 32,
            duration: 350,
            useNativeDriver: false,
          }).start()
        })
      })
    } else if (!panelOpen && isOpen.current) {
      isOpen.current = false

      // Phase 1 → panel collapses
      Animated.timing(boxHeight, {
        toValue: 0, duration: 250, useNativeDriver: false,
      }).start(() => {
        // Phase 2 → bar up
        Animated.timing(translateY, {
          toValue: -8, duration: 200, useNativeDriver: false,
        }).start(() => {
          // Phase 3 → bar down
          Animated.timing(translateY, {
            toValue: 0, duration: 200, useNativeDriver: false,
          }).start()
        })
      })
    }
  }, [panelOpen])

  /* ── smoothly resize if content changes while open ─── */
  useEffect(() => {
    if (isOpen.current && contentH > 0) {
      Animated.timing(boxHeight, {
        toValue: contentH, duration: 200, useNativeDriver: false,
      }).start()
    }
  }, [contentH])

  return (
    <Animated.View
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
      </Animated.View>
    </Animated.View>
  )
}

export default MessageSpacer
