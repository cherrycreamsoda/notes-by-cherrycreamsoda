import { Platform } from 'react-native'

export const webTransition = (property) =>
  Platform.select({
    web: { transitionProperty: property, transitionDuration: '300ms' },
    default: {},
  })
