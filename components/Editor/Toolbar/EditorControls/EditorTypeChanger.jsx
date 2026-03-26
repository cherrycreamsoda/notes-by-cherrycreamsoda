import { useState, useRef, useCallback, useEffect } from 'react'
import { View, TouchableOpacity, Modal, TouchableWithoutFeedback, Platform } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_SELECTED } from '@/constants/theme'
import styles from './EditorTypeChanger.styles'

const DROPDOWN_GAP = 6

const editorTypes = [
  { icon: 'simpleText', label: 'Simple Text' },
  { icon: 'richText', label: 'Rich Text' },
  { icon: 'listTodo', label: 'List' },
  { icon: 'alarm', label: 'Reminders' },
  { icon: 'tableCells', label: 'Table' },
]

let createPortal
if (Platform.OS === 'web') {
  createPortal = require('react-dom').createPortal
}

const EditorTypeChanger = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const dropdownRef = useRef(null)

  const selectedIconName = editorTypes[selectedIndex].icon

  // Close dropdown when clicking outside (web)
  useEffect(() => {
    if (Platform.OS !== 'web' || !dropdownOpen) return
    const handleClick = (e) => {
      if (
        triggerRef.current && triggerRef.current.contains(e.target)
      ) return
      if (
        dropdownRef.current && dropdownRef.current.contains(e.target)
      ) return
      setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen])

  const openDropdown = useCallback(() => {
    const node = triggerRef.current
    if (!node) return

    if (Platform.OS === 'web') {
      const rect = node.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + DROPDOWN_GAP, left: rect.left })
      setDropdownOpen(true)
    } else {
      node.measureInWindow((x, y, width, height) => {
        setDropdownPos({ top: y + height + DROPDOWN_GAP, left: x })
        setDropdownOpen(true)
      })
    }
  }, [])

  const handleSelect = (index) => {
    setSelectedIndex(index)
    setDropdownOpen(false)
  }

  const dropdownContent = (
    <View ref={dropdownRef} style={[styles.dropdown, { top: dropdownPos.top, left: dropdownPos.left }]}>
      {editorTypes.map((item, index) => {
        const isSelected = index === selectedIndex
        return (
          <TouchableOpacity
            key={index}
            style={[styles.dropdownItem, isSelected && styles.dropdownItemSelected]}
            onPress={() => handleSelect(index)}
          >
            <Icon name={item.icon} size={ICON_SIZE} color={isSelected ? ICON_COLOR_SELECTED : ICON_COLOR} />
          </TouchableOpacity>
        )
      })}
    </View>
  )

  const renderDropdown = () => {
    if (!dropdownOpen) return null

    if (Platform.OS === 'web') {
      return createPortal(dropdownContent, document.body)
    }

    return (
      <Modal transparent visible animationType="fade" onRequestClose={() => setDropdownOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              {dropdownContent}
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        ref={triggerRef}
        style={styles.trigger}
        onPress={() => dropdownOpen ? setDropdownOpen(false) : openDropdown()}
      >
        <Icon name={selectedIconName} size={ICON_SIZE} color={ICON_COLOR} />
        <View style={styles.arrow} />
      </TouchableOpacity>

      {renderDropdown()}
    </View>
  )
}

export default EditorTypeChanger
