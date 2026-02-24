import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR, ICON_COLOR_DANGER } from '@/constants/theme'

const Close = ({ onPress }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <TouchableOpacity
      onPress={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon name="closeFile" size={ICON_SIZE} color={hovered ? ICON_COLOR_DANGER : ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default Close
