import { LayoutAnimation, Platform, UIManager } from 'react-native'

// Enable LayoutAnimation on Android (required for it to work).
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

/**
 * Cross-platform animation strategy
 * ───────────────────────────────────
 * Web  → CSS transitions via `webTransition` (applied in *.styles.js files).
 * Native → LayoutAnimation via `animate`  (called before state changes).
 *
 * These must NOT both run on web — LayoutAnimation's global transition
 * would override the specific CSS transitionProperty set by webTransition.
 */

/**
 * Returns web-only CSS transition styles for the given properties.
 * On native this returns an empty object so it's safe to spread anywhere.
 *
 * @param {string} property  Comma-separated CSS property names to transition.
 */
export const webTransition = (property) =>
  Platform.select({
    web: { transitionProperty: property, transitionDuration: '300ms' },
    default: {},
  })

/**
 * Triggers a layout animation on native platforms.
 * No-op on web (CSS transitions handle it via `webTransition`).
 */
export const animate = () => {
  if (Platform.OS !== 'web') {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
}
