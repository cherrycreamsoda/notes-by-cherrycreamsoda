import { TouchableOpacity, View } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'
import styles from './NotificationToggle.styles'

const NotificationToggle = ({ hasAlert = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} dataSet={{ notificationToggle: true }}>
      <Icon
        name={hasAlert ? 'notificationAlert' : 'notificationNormal'}
        size={ICON_SIZE}
        color={ICON_COLOR}
      />
      {hasAlert && <View style={styles.alertDot} />}
    </TouchableOpacity>
  )
}

export default NotificationToggle
