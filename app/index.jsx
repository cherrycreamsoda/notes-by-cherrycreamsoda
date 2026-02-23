import { useState } from 'react'
import {
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  useWindowDimensions,
} from 'react-native'
import { TABLET_BREAKPOINT } from '@/constants/theme'
import ControlBar from '@/components/ControlBar'
import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'
import Editor from '@/components/Editor'
import styles from './index.styles'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [topbarOpen, setTopbarOpen] = useState(false)
  const { width } = useWindowDimensions()
  const isTablet = width <= TABLET_BREAKPOINT

  const toggleSidebar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setSidebarOpen(prev => !prev)
  }

  const toggleTopbar = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTopbarOpen(prev => !prev)
  }

  return (
    <View style={styles.outer}>
      <ControlBar
        onToggleSidebar={toggleSidebar}
        onToggleTopbar={toggleTopbar}
        sidebarOpen={sidebarOpen}
        topbarOpen={topbarOpen}
      />
      <Topbar isOpen={topbarOpen} />
      <View style={styles.content}>
        <Sidebar isOpen={sidebarOpen} isTablet={isTablet} />
        <Editor />
      </View>
    </View>
  )
}

export default Home