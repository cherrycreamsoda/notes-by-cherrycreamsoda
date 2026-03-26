import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_ACTIVE_PIN } from '@/constants/theme'
import { useNotes } from '@/context/notes'
import { useNotifications } from '@/context/notifications'

const PinToggle = () => {
  const { activeNote, updateNote } = useNotes()
  const { addNotification } = useNotifications()
  const pinned = activeNote?.pinned ?? false

  return (
    <TouchableOpacity
      onPress={() => {
        if (!activeNote) return
        if (activeNote.locked) {
          addNotification({ type: 'error', title: 'Locked notes cannot be pinned or unpinned.' })
          return
        }
        updateNote(activeNote.id, { pinned: !pinned })
      }}
    >
      <Icon name="pushPin" size={ICON_SIZE} color={pinned ? ICON_COLOR_ACTIVE_PIN : ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default PinToggle
