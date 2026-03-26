import { useState, useMemo } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import { MOBILE_BREAKPOINT } from '@/constants/theme'
import { useUI } from '@/context/ui'
import { useNotes } from '@/context/notes'
import { useNotifications } from '@/context/notifications'
import SidebarNoteItem from './SidebarNoteItem'
import styles from './SidebarPanel.styles'

const NAV_ITEMS = [
  { key: 'all', label: 'All Notes' },
  { key: 'pinned', label: 'Pinned Notes' },
  { key: 'deleted', label: 'Deleted Notes' },
]

const SidebarPanel = () => {
  const { sidebarOpen, openNotePane } = useUI()
  const { notes, activeNote, updateNote, deleteNote, selectNote } = useNotes()
  const { addNotification } = useNotifications()
  const { width: windowWidth } = useWindowDimensions()
  const isMobile = windowWidth <= MOBILE_BREAKPOINT
  const [selectedKey, setSelectedKey] = useState('all')
  const [searchText, setSearchText] = useState('')

  /* ── Filter notes by nav tab + search ──────────────────── */
  const filteredNotes = useMemo(() => {
    let list = notes

    // Tab filter
    if (selectedKey === 'all') {
      list = list.filter(n => !n.deleted)
    } else if (selectedKey === 'pinned') {
      list = list.filter(n => n.pinned && !n.deleted)
    } else if (selectedKey === 'deleted') {
      list = list.filter(n => n.deleted)
    }

    // Search filter
    if (searchText.trim()) {
      const q = searchText.toLowerCase()
      list = list.filter(n =>
        (n.title || '').toLowerCase().includes(q) ||
        (n.body || '').toLowerCase().includes(q),
      )
    }

    // Pinned first, then by most recently updated
    return list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return (b.updatedAt || 0) - (a.updatedAt || 0)
    })
  }, [notes, selectedKey, searchText])

  const deletedCount = useMemo(() => notes.filter(n => n.deleted).length, [notes])
  const selectedLabel = NAV_ITEMS.find(item => item.key === selectedKey)?.label
  const isDeletedView = selectedKey === 'deleted'

  /* ── Handlers ──────────────────────────────────────────── */
  const handleSelect = (id) => {
    selectNote(id)
    openNotePane()
  }

  const handleTogglePin = (id, currentPinned, locked) => {
    if (locked) {
      addNotification({ type: 'error', title: 'Locked notes cannot be pinned or unpinned.' })
      return
    }
    updateNote(id, { pinned: !currentPinned })
  }

  const handleToggleLock = (id, currentLocked) => {
    updateNote(id, { locked: !currentLocked })
  }

  const handleDelete = (id, pinned, locked) => {
    if (locked) {
      addNotification({ type: 'error', title: 'Locked notes cannot be deleted.' })
      return
    }
    if (pinned) {
      addNotification({ type: 'error', title: 'Pinned notes cannot be deleted. Unpin first.' })
      return
    }
    updateNote(id, { deleted: true })
  }

  const handleRestore = (id) => {
    updateNote(id, { deleted: false })
  }

  const handleDeleteAllPermanently = () => {
    const deletedNotes = notes.filter(n => n.deleted)
    deletedNotes.forEach(n => deleteNote(n.id))
  }

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
        {NAV_ITEMS.map(item => {
          const isDeleted = item.key === 'deleted'
          const showRed = isDeleted && isDeletedView && deletedCount > 0

          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.navButton,
                item.key === selectedKey && styles.navButtonSelected,
                showRed && styles.navButtonDanger,
              ]}
              onPress={() => {
                if (isDeleted && selectedKey === 'deleted' && deletedCount > 0) {
                  handleDeleteAllPermanently()
                } else {
                  setSelectedKey(item.key)
                }
              }}
            >
              <Text
                style={[
                  styles.navButtonText,
                  item.key === selectedKey && styles.navButtonTextSelected,
                  showRed && styles.navButtonTextDanger,
                ]}
              >
                {showRed ? 'Permanently Delete All' : item.label}
              </Text>
            </TouchableOpacity>
          )
        })}

        {/* Separator below nav */}
        <View style={styles.navSeparator} />

        {/* Notes info bar */}
        <View style={styles.notesInfo}>
          <Text style={styles.notesInfoLabel} numberOfLines={1}>
            {selectedLabel}
          </Text>
          <Text style={styles.notesInfoCount}>{filteredNotes.length}</Text>
        </View>

        {/* Separator below info bar */}
        <View style={styles.navSeparator} />

        {/* Notes list */}
        <ScrollView style={styles.notesList} contentContainerStyle={styles.notesListContent}>
          {filteredNotes.map((n, i) => (
            <View key={n.id}>
              {i > 0 && <View style={styles.noteSeparator} />}
              <SidebarNoteItem
                note={n}
                isSelected={activeNote?.id === n.id}
                isDeletedView={isDeletedView}
                onSelect={() => handleSelect(n.id)}
                onTogglePin={() => handleTogglePin(n.id, n.pinned, n.locked)}
                onRestore={() => handleRestore(n.id)}
                onToggleLock={() => handleToggleLock(n.id, n.locked)}
                onDelete={() => handleDelete(n.id, n.pinned, n.locked)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default SidebarPanel
