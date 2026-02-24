import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const LockToggle = () => {
  const [locked, setLocked] = useState(false)

  return (
    <TouchableOpacity onPress={() => setLocked(prev => !prev)}>
      <Icon name={locked ? 'lockFilled' : 'lockOpen'} size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default LockToggle
