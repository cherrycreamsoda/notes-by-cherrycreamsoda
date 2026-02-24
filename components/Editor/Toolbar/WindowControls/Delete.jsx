import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'

const ICON_SIZE = 24
const ICON_COLOR = '#474747'

const Delete = () => {
  const [hovered, setHovered] = useState(false)

  return (
    <TouchableOpacity
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name="deleteForever" size={ICON_SIZE} color={hovered ? '#a40000' : ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default Delete
