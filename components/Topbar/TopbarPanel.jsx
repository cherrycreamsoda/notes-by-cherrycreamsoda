import { useState } from 'react'
import { View } from 'react-native'
import { useUI } from '@/context/ui'
import { useNotifications } from '@/context/notifications'
import ProfileIcon from './ProfileIcon'
import DarkModeToggle from './DarkModeToggle'
import NotificationToggle from './NotificationToggle'
import SaveLocationButton from './SaveLocationButton'
import TimerButton from './TimerButton'
import styles from './TopbarPanel.styles'

const TopbarPanel = () => {
  const { topbarOpen } = useUI()
  const { unreadCount, togglePanel } = useNotifications()
  const [isDark, setIsDark] = useState(true)

  return (
    <View style={[styles.panel, !topbarOpen && styles.panelClosed]}>
      <View style={styles.inner}>
        <ProfileIcon />
        <DarkModeToggle isDark={isDark} onPress={() => setIsDark(!isDark)} />
        <NotificationToggle hasAlert={unreadCount > 0} onPress={togglePanel} />
        <SaveLocationButton />
        <TimerButton />
      </View>
    </View>
  )
}

export default TopbarPanel
