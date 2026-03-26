import { useState } from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_DANGER } from '@/constants/theme'
import { useUI } from '@/context/ui'
import { useNotes } from '@/context/notes'

const isTouch = Platform.OS !== 'web'

const Close = () => {
  const { closeNotePane } = useUI()
  const { selectNote } = useNotes()
  const [hovered, setHovered] = useState(false)

  const iconColor = isTouch || hovered ? ICON_COLOR_DANGER : ICON_COLOR

  return (
    <TouchableOpacity
      onPress={() => {
        selectNote(null)
        closeNotePane()
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name="closeFile" size={ICON_SIZE} color={iconColor} />
    </TouchableOpacity>
  )
}

export default Close
