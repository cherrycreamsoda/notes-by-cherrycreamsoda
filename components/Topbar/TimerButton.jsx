import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const TimerButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="timer" size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default TimerButton
