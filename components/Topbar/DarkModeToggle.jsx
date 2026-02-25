import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const DarkModeToggle = ({ isDark = true, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={isDark ? 'moon' : 'sun'} size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default DarkModeToggle
