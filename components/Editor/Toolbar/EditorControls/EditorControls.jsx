import { View, useWindowDimensions } from 'react-native'
import { MOBILE_BREAKPOINT } from '@/constants/theme'
import Preview from './Preview'
import EditorTypeChanger from './EditorTypeChanger'
import ExportFile from '../WindowControls/ExportFile'
import Close from './Close'
import styles from './EditorControls.styles'

const EditorControls = () => {
  const { width } = useWindowDimensions()
  const isMobile = width <= MOBILE_BREAKPOINT

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Preview />
        <EditorTypeChanger />
      </View>

      <View style={styles.right}>
        {isMobile && <ExportFile />}
        <Close />
      </View>
    </View>
  )
}

export default EditorControls
