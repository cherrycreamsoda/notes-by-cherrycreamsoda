import { View, Platform, StyleSheet } from 'react-native'

const PROFILE_SIZE = 26

const GRADIENT_STOPS = '#7fffd4, #84f985, #89f336, #c4df46, #ffcb56, #f3d58e, #7fffd4'

const ProfileIcon = ({ size = PROFILE_SIZE }) => {
  const gradientStyle =
    Platform.OS === 'web'
      ? { background: `conic-gradient(${GRADIENT_STOPS})` }
      : { backgroundColor: '#498d7c' }

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
        gradientStyle,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1.5,
    borderColor: '#e3e3e3',
  },
})

export default ProfileIcon
