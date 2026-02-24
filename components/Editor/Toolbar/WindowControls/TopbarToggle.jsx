import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const TopbarToggle = ({ onPress, isOpen }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={isOpen ? 'navbarCollapse' : 'navbarExpand'} size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default TopbarToggle
