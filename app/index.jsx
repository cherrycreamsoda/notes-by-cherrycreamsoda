import { useState } from 'react'
import {
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  useWindowDimensions,
} from 'react-native'
import { TABLET_BREAKPOINT } from '@/constants/theme'
import Topbar from '@/components/Topbar/Topbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Editor from '@/components/Editor/Editor'
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
      <Topbar isOpen={topbarOpen} />
      <View style={styles.content}>
        <Sidebar isOpen={sidebarOpen} isTablet={isTablet} />
        <Editor
          onToggleSidebar={toggleSidebar}
          onToggleTopbar={toggleTopbar}
          sidebarOpen={sidebarOpen}
          topbarOpen={topbarOpen}
        />
      </View>
    </View>
  )
}

export default Home