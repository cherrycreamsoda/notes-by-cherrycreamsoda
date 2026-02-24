import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'

const ICON_SIZE = 24
const ICON_COLOR = '#474747'

const ExportFile = () => {
  return (
    <TouchableOpacity>
      <Icon name="fileExport" size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default ExportFile
