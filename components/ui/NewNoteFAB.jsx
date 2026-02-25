import { useRef, useEffect } from 'react'
import { Animated, TouchableOpacity, useWindowDimensions } from 'react-native'
import { TABLET_BREAKPOINT } from '@/constants/theme'
import { useAppState } from '@/context/AppContext'
import Icon from '@/components/Icon/Icon'
import styles, {
  COMPACT,
  DESKTOP_OPEN,
  DESKTOP_CLOSED,
  ICON_DESKTOP_OPEN,
  ICON_COMPACT,
} from './NewNoteFAB.styles'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
const DURATION = 200

const NewNoteFAB = () => {
  const { topbarOpen, sidebarOpen, noteOpen, openNote } = useAppState()
  const { width } = useWindowDimensions()

  const isDesktop = width > TABLET_BREAKPOINT
  const isCompact = !isDesktop
  const desktopOpen = isDesktop && (topbarOpen || sidebarOpen)
  const hidden = isCompact && noteOpen

  // Desktop: interpolates between closed (0) and open (1)
  const sizeAnim = useRef(new Animated.Value(desktopOpen ? 1 : 0)).current
  // Compact: 0 = invisible (mount / hidden), 1 = visible
  const compactAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(sizeAnim, {
      toValue: desktopOpen ? 1 : 0,
      duration: DURATION,
      useNativeDriver: false,
    }).start()
  }, [desktopOpen])

  useEffect(() => {
    if (!isCompact) return
    Animated.timing(compactAnim, {
      toValue: hidden ? 0 : 1,
      duration: DURATION,
      useNativeDriver: false,
    }).start()
  }, [isCompact, hidden])

  // ── Desktop ───────────────────────────────────────────
  if (isDesktop) {
    const animSize = sizeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [DESKTOP_CLOSED, DESKTOP_OPEN],
    })
    const animBorderRadius = sizeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [DESKTOP_CLOSED / 2, DESKTOP_OPEN / 2],
    })
    const iconScale = sizeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [DESKTOP_CLOSED / DESKTOP_OPEN, 1],
    })

    return (
      <AnimatedTouchable
        onPress={openNote}
        activeOpacity={0.7}
        style={[
          styles.fab,
          styles.desktopPosition,
          {
            width: animSize,
            height: animSize,
            borderRadius: animBorderRadius,
          },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: iconScale }] }}>
          <Icon name="plus" size={ICON_DESKTOP_OPEN} color="#e3e3e3" />
        </Animated.View>
      </AnimatedTouchable>
    )
  }

  // ── Compact (mobile / tablet) ─────────────────────────
  const compactScale = compactAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  })

  return (
    <AnimatedTouchable
      onPress={openNote}
      activeOpacity={0.7}
      style={[
        styles.fab,
        styles.compact,
        {
          left: (width - COMPACT) / 2,
          opacity: compactAnim,
          transform: [{ scale: compactScale }],
        },
        hidden && { pointerEvents: 'none' },
      ]}
    >
      <Icon name="plus" size={ICON_COMPACT} color="#e3e3e3" />
    </AnimatedTouchable>
  )
}

export default NewNoteFAB
