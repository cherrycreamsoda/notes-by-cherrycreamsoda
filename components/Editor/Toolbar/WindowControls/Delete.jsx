import { useState } from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_DANGER } from '@/constants/theme'
import { useNotes } from '@/context/notes'
import { useUI } from '@/context/ui'

const isTouch = Platform.OS !== 'web'

const Delete = () => {
  const [hovered, setHovered] = useState(false)
  const { activeNote, updateNote } = useNotes()
  const { closeNotePane } = useUI()

  const handleDelete = () => {
    if (!activeNote) return
    updateNote(activeNote.id, { deleted: true })
    closeNotePane()
  }

  const iconColor = isTouch || hovered ? ICON_COLOR_DANGER : ICON_COLOR

  return (
    <TouchableOpacity
      onPress={handleDelete}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name="deleteForever" size={ICON_SIZE} color={iconColor} />
    </TouchableOpacity>
  )
}

export default Delete
