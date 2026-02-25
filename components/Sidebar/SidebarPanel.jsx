import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native'
import { MOBILE_BREAKPOINT } from '@/constants/theme'
import { useAppState } from '@/context/AppContext'
import styles from './SidebarPanel.styles'

const NAV_ITEMS = [
  { key: 'all', label: 'All Notes' },
  { key: 'pinned', label: 'Pinned Notes' },
  { key: 'deleted', label: 'Deleted Notes' },
]

const SidebarPanel = () => {
  const { sidebarOpen } = useAppState()
  const { width: windowWidth } = useWindowDimensions()
  const isMobile = windowWidth <= MOBILE_BREAKPOINT
  const [selectedKey, setSelectedKey] = useState('all')
  const [searchText, setSearchText] = useState('')

  // Placeholder count — will come from backend later
  const noteCount = 0

  const selectedLabel = NAV_ITEMS.find(item => item.key === selectedKey)?.label

  return (
    <View style={[
      styles.panel,
      isMobile && { width: windowWidth },
      isMobile && styles.innerMobilePadding,
      !sidebarOpen && styles.panelClosed,
      !sidebarOpen && isMobile && { left: -windowWidth },
    ]}>
      <View style={styles.inner}>
        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          placeholderTextColor="#555555"
          value={searchText}
          onChangeText={setSearchText}
        />

        {/* Nav buttons */}
        {NAV_ITEMS.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.navButton,
              item.key === selectedKey && styles.navButtonSelected,
            ]}
            onPress={() => setSelectedKey(item.key)}
          >
            <Text
              style={[
                styles.navButtonText,
                item.key === selectedKey && styles.navButtonTextSelected,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Notes info bar */}
        <View style={styles.notesInfo}>
          <Text style={styles.notesInfoLabel} numberOfLines={1}>
            {selectedLabel}
          </Text>
          <Text style={styles.notesInfoCount}>{noteCount}</Text>
        </View>

        {/* Notes list area — placeholder for future */}
        <View style={styles.notesList} />
      </View>
    </View>
  )
}

export default SidebarPanel
