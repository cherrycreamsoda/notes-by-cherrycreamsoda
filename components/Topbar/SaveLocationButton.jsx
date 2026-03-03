import { useState, useRef, useEffect } from 'react'
import { TouchableOpacity, Platform, Animated } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_SELECTED } from '@/constants/theme'
import {
  requestFolderAccess,
  hasFileSystemAccess,
  needsReconnect,
} from '@/services/storage/backend'
import { useNotes } from '@/context/notes'

/**
 * SaveLocationButton
 *
 * Floppy-disk icon in the topbar.
 *
 * Three visual states:
 *   • dim (grey)    — no folder selected, using IndexedDB fallback
 *   • pulsing amber — folder was selected but permission expired (needs click)
 *   • solid white   — connected to a real folder on disk
 *
 * On click:
 *   • If reconnect needed → re-grants permission (one-click, no picker)
 *   • Otherwise          → opens directory picker
 *   • After connecting   → reloads notes from the filesystem
 */

const RECONNECT_COLOR = '#ffaa00'

const SaveLocationButton = () => {
  const { reloadFromStorage } = useNotes()
  const [connected, setConnected] = useState(hasFileSystemAccess)
  const [reconnectNeeded, setReconnectNeeded] = useState(needsReconnect)

  // Pulse animation for reconnect state
  const pulseAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!reconnectNeeded) {
      pulseAnim.setValue(1)
      return
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [reconnectNeeded])

  // Only show on web
  if (Platform.OS !== 'web') return null

  const handlePress = async () => {
    const { granted } = await requestFolderAccess()
    if (granted) {
      setConnected(true)
      setReconnectNeeded(false)
      // Reload notes from the now-connected filesystem
      reloadFromStorage()
    }
  }

  const iconColor = connected
    ? ICON_COLOR_SELECTED
    : reconnectNeeded
      ? RECONNECT_COLOR
      : ICON_COLOR

  return (
    <Animated.View style={{ opacity: reconnectNeeded ? pulseAnim : 1 }}>
      <TouchableOpacity onPress={handlePress}>
        <Icon name="floppy" size={ICON_SIZE} color={iconColor} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default SaveLocationButton
