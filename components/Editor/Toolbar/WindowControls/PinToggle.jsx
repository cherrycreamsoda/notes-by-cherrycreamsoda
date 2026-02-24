import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'

const ICON_SIZE = 24
const ICON_COLOR = '#474747'

const PinToggle = () => {
  const [pinned, setPinned] = useState(false)

  return (
    <TouchableOpacity onPress={() => setPinned(prev => !prev)}>
      <Icon name="pushPin" size={ICON_SIZE} color={pinned ? '#ffe600' : ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default PinToggle
