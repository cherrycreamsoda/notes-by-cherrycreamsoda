import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'
import { useAppState } from '@/context/AppContext'

const SidebarToggle = () => {
  const { sidebarOpen, toggleSidebar } = useAppState()

  return (
    <TouchableOpacity onPress={toggleSidebar}>
      <Icon name={sidebarOpen ? 'sidebarCollapse' : 'sidebarExpand'} size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default SidebarToggle
