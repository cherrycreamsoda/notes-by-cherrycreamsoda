import { TouchableOpacity, Platform, Alert } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'
import { useNotes } from '@/context/notes'
import { getExportData } from '@/services/notes'

/**
 * Web: triggers a browser download via Blob + anchor click.
 * Native (iOS / Android): placeholder — will be swapped for
 * Share API or react-native-fs in a future update.
 */
const exportWeb = (data) => {
  const blob = new Blob([data.content], { type: data.mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = data.fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const exportNative = (_data) => {
  // TODO: implement via Share API or react-native-fs
  Alert.alert('Export', 'File export is not yet available on this platform.')
}

const ExportFile = () => {
  const { activeNote } = useNotes()

  const handleExport = () => {
    const data = getExportData(activeNote)
    if (!data) return

    if (Platform.OS === 'web') {
      exportWeb(data)
    } else {
      exportNative(data)
    }
  }

  return (
    <TouchableOpacity onPress={handleExport}>
      <Icon name="fileExport" size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default ExportFile
