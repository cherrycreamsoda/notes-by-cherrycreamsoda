import { View, Platform, StyleSheet } from 'react-native'

const PROFILE_SIZE = 26

const GRADIENT = 'repeating-linear-gradient(45deg, #740000, #690000 4px, #570000 8px, #4f0000 12px)'

const ProfileIcon = ({ size = PROFILE_SIZE }) => {
  const gradientStyle =
    Platform.OS === 'web'
      ? { background: GRADIENT }
      : { backgroundColor: '#606dbc' }

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
    borderWidth: 2,
    borderColor: '#e3e3e3',
  },
})

export default ProfileIcon
