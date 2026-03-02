import { TouchableOpacity } from 'react-native'
import Icon from '@/components/Icon/Icon'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'
import { useNotes } from '@/context/notes'
import { getExportData } from '@/services/notes'

const ExportFile = () => {
  const { activeNote } = useNotes()

  const handleExport = () => {
    const data = getExportData(activeNote)
    if (!data) return

    // Web: create a Blob download link
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

  return (
    <TouchableOpacity onPress={handleExport}>
      <Icon name="fileExport" size={ICON_SIZE} color={ICON_COLOR} />
    </TouchableOpacity>
  )
}

export default ExportFile
