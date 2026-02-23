import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  useWindowDimensions,
} from 'react-native'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const SIDEBAR_WIDTH = 200
const TOPBAR_HEIGHT = 40
const TABLET_BREAKPOINT = 768

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

      {/* Controls — always visible */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={toggleSidebar} style={styles.btn}>
          <Text style={styles.btnText}>{sidebarOpen ? 'Close' : 'Open'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTopbar} style={styles.btn}>
          <Text style={styles.btnText}>{topbarOpen ? 'Hide Bar' : 'Show Bar'}</Text>
        </TouchableOpacity>
      </View>

      {/* Topbar — always in normal flow, toggles height */}
      <View style={[styles.topbar, !topbarOpen && styles.topbarClosed]} />

      {/* Content area — sidebar + editor live here */}
      <View style={styles.content}>

        {/* Sidebar — same element in both modes, only positioning changes */}
        <View
          style={[
            styles.sidebar,
            isTablet && styles.sidebarTablet,
            !sidebarOpen && styles.sidebarClosed,
          ]}
        />

        {/* Editor — always fills remaining space */}
        <View style={styles.editor} />

      </View>
    </View>
  )
}

export default Home

const webTransition = (property) =>
  Platform.select({
    web: { transitionProperty: property, transitionDuration: '300ms' },
  })

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    borderWidth: 2,
    borderColor: '#ff00ff',
  },

  controls: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#ffffff',
    zIndex: 30,
  },

  topbar: {
    width: '100%',
    height: TOPBAR_HEIGHT,
    backgroundColor: '#ffaa00',
    borderWidth: 2,
    borderColor: '#00ffff',
    overflow: 'hidden',
    ...webTransition('height'),
  },

  topbarClosed: {
    height: 0,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#ffff00',
  },

  sidebar: {
    height: '100%',
    width: SIDEBAR_WIDTH,
    backgroundColor: '#ff0000',
    borderWidth: 2,
    borderColor: '#0000ff',
    overflow: 'hidden',
    ...webTransition('width'),
  },

  sidebarTablet: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    zIndex: 20,
    ...webTransition('width'),
  },

  sidebarClosed: {
    width: 0,
  },

  editor: {
    height: '100%',
    flex: 1,
    backgroundColor: '#00ffa2',
    borderWidth: 2,
    borderColor: '#ff8800',
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 22,
  },

  btnText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 11,
  },
})