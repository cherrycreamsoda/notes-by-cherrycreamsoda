import { useState } from 'react'
import {
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  useWindowDimensions,
} from 'react-native'
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/theme'
import Topbar from '@/components/Topbar/Topbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import Editor from '@/components/Editor/Editor'
import styles from './index.styles'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [topbarOpen, setTopbarOpen] = useState(true)
  const { width } = useWindowDimensions()
  const isMobile = width <= MOBILE_BREAKPOINT
  const isTablet = width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT

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
        <Sidebar isOpen={sidebarOpen} isMobile={isMobile} isTablet={isTablet} />
        <Editor
          onToggleSidebar={toggleSidebar}
          onToggleTopbar={toggleTopbar}
          sidebarOpen={sidebarOpen}
          topbarOpen={topbarOpen}
          fileName="newmarkdown.md"
        />
      </View>
    </View>
  )
}

export default Home