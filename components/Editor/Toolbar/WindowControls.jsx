import { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import {
  TbLayoutNavbarExpand,
  TbLayoutNavbarCollapseFilled,
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapseFilled,
  TbFileExport,
  TbLockFilled,
} from 'react-icons/tb'
import {
  MdDeleteForever,
  MdOutlinePushPin,
  MdLockOpen,
} from 'react-icons/md'
import { LuFileSymlink } from 'react-icons/lu'
import styles from './WindowControls.styles'

const ICON_SIZE = 24
const ICON_COLOR = '#474747'

const WindowControls = ({ onToggleSidebar, onToggleTopbar, sidebarOpen, topbarOpen }) => {
  const [locked, setLocked] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [deleteHovered, setDeleteHovered] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={onToggleSidebar} style={styles.iconBtn}>
          {sidebarOpen
            ? <TbLayoutSidebarLeftCollapseFilled size={ICON_SIZE} color={ICON_COLOR} />
            : <TbLayoutSidebarLeftExpand size={ICON_SIZE} color={ICON_COLOR} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={onToggleTopbar} style={styles.iconBtn}>
          {topbarOpen
            ? <TbLayoutNavbarCollapseFilled size={ICON_SIZE} color={ICON_COLOR} />
            : <TbLayoutNavbarExpand size={ICON_SIZE} color={ICON_COLOR} />}
        </TouchableOpacity>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconBtn}>
          <LuFileSymlink size={ICON_SIZE} color={ICON_COLOR} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <TbFileExport size={ICON_SIZE} color={ICON_COLOR} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setLocked(prev => !prev)} style={styles.iconBtn}>
          {locked
            ? <TbLockFilled size={ICON_SIZE} color={ICON_COLOR} />
            : <MdLockOpen size={ICON_SIZE} color={ICON_COLOR} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPinned(prev => !prev)} style={styles.iconBtn}>
          <MdOutlinePushPin size={ICON_SIZE} color={pinned ? '#ffe600' : ICON_COLOR} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onMouseEnter={() => setDeleteHovered(true)}
          onMouseLeave={() => setDeleteHovered(false)}
        >
          <MdDeleteForever size={ICON_SIZE} color={deleteHovered ? '#a40000' : ICON_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WindowControls
