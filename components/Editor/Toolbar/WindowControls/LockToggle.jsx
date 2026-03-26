import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'
import { useNotes } from '@/context/notes'
import { useNotifications } from '@/context/notifications'

const LockToggle = () => {
  const { activeNote, updateNote } = useNotes()
  const { addNotification } = useNotifications()
  const locked = activeNote?.locked ?? false

  return (
    <TouchableOpacity
      onPress={() => {
        if (!activeNote) return
        updateNote(activeNote.id, { locked: !locked })
      }}
    >
      <Icon name={locked ? 'lockFilled' : 'lockOpen'} size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default LockToggle
