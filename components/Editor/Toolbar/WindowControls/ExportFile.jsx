import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const ExportFile = () => {
  return (
    <TouchableOpacity>
      <Icon name="fileExport" size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default ExportFile
