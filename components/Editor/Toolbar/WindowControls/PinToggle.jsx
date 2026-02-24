import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_ACTIVE_PIN } from '@/constants/theme'

const PinToggle = () => {
  const [pinned, setPinned] = useState(false)

  return (
    <TouchableOpacity onPress={() => setPinned(prev => !prev)}>
      <Icon name="pushPin" size={ICON_SIZE} color={pinned ? ICON_COLOR_ACTIVE_PIN : ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default PinToggle
