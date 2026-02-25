import {
  View,
  useWindowDimensions,
} from 'react-native'
import { MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '@/constants/theme'
import Topbar from '@/components/Topbar/Topbar'
import TopbarPanel from '@/components/Topbar/TopbarPanel'
import Sidebar from '@/components/Sidebar/Sidebar'
import SidebarPanel from '@/components/Sidebar/SidebarPanel'
import Editor from '@/components/Editor/Editor'
import MessageSpacer from '@/components/ui/MessageSpacer'
import NewNoteFAB from '@/components/ui/NewNoteFAB'
import Logo from '@/components/ui/Logo'
import styles from './index.styles'

const Home = () => {
  const { width } = useWindowDimensions()
  const isMobile = width <= MOBILE_BREAKPOINT
  const isTablet = width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT

  return (
    <View style={styles.outer}>
      <Topbar />
      <TopbarPanel />
      <MessageSpacer />
      <NewNoteFAB />
      <Logo />
      <View style={styles.content}>
        <Sidebar isMobile={isMobile} isTablet={isTablet} />
        <Editor fileName="newmarkdown.md" />
      </View>
      <SidebarPanel />
    </View>
  )
}

export default Home