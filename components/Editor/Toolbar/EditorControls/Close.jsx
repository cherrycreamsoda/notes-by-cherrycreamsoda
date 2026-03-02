import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_DANGER } from '@/constants/theme'
import { useUI } from '@/context/ui'
import { useNotes } from '@/context/notes'

const Close = () => {
  const { closeNotePane } = useUI()
  const { activeNote, deleteNote } = useNotes()
  const [hovered, setHovered] = useState(false)

  return (
    <TouchableOpacity
      onPress={() => {
        if (activeNote) deleteNote(activeNote.id)
        closeNotePane()
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name="closeFile" size={ICON_SIZE} color={hovered ? ICON_COLOR_DANGER : ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default Close
