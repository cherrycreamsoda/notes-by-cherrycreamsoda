import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'
import { useUI } from '@/context/ui'

const TopbarToggle = () => {
  const { topbarOpen, toggleTopbar } = useUI()

  return (
    <TouchableOpacity onPress={toggleTopbar}>
      <Icon name={topbarOpen ? 'navbarCollapse' : 'navbarExpand'} size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default TopbarToggle
