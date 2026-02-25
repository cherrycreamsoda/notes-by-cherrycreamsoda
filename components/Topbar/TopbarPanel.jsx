import { useState } from 'react'
import { View } from 'react-native'
import { useAppState } from '@/context/AppContext'
import ProfileIcon from './ProfileIcon'
import DarkModeToggle from './DarkModeToggle'
import NotificationToggle from './NotificationToggle'
import TimerButton from './TimerButton'
import styles from './TopbarPanel.styles'

const TopbarPanel = () => {
  const { topbarOpen } = useAppState()
  const [isDark, setIsDark] = useState(true)
  const [hasAlert, setHasAlert] = useState(false)

  return (
    <View style={[styles.panel, !topbarOpen && styles.panelClosed]}>
      <View style={styles.inner}>
        <ProfileIcon />
        <DarkModeToggle isDark={isDark} onPress={() => setIsDark(!isDark)} />
        <NotificationToggle hasAlert={hasAlert} onPress={() => setHasAlert(!hasAlert)} />
        <TimerButton />
      </View>
    </View>
  )
}

export default TopbarPanel
