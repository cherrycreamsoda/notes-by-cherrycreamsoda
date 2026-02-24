import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'

const ICON_SIZE = 24
const ICON_COLOR = '#474747'

const ImportFile = () => {
  return (
    <TouchableOpacity>
      <Icon name="fileImport" size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default ImportFile
