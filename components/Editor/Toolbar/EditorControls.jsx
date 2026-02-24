import { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MdOutlineAlarm } from 'react-icons/md'
import { PiFilmSlate } from 'react-icons/pi'
import { TfiText } from 'react-icons/tfi'
import { BsFileEarmarkRichtext } from 'react-icons/bs'
import { LuListTodo } from 'react-icons/lu'
import { HiTableCells } from 'react-icons/hi2'
import styles from './EditorControls.styles'

const ICON_SIZE_SM = 24
const ICON_COLOR = '#474747'

const dropdownItems = [
  { icon: TfiText },
  { icon: BsFileEarmarkRichtext },
  { icon: LuListTodo },
  { icon: MdOutlineAlarm },
  { icon: HiTableCells },
]

const EditorControls = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBtn}>
        <PiFilmSlate size={ICON_SIZE_SM} color={ICON_COLOR} />
      </TouchableOpacity>

      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setDropdownOpen(prev => !prev)}
        >
          <TfiText size={ICON_SIZE_SM} color={ICON_COLOR} />
          {!dropdownOpen && <View style={styles.arrow} />}
        </TouchableOpacity>

        {dropdownOpen && (
          <View style={styles.dropdown}>
            {dropdownItems.map((item, index) => {
              const Icon = item.icon
              return (
                <TouchableOpacity key={index} style={styles.dropdownItem}>
                  <Icon size={ICON_SIZE_SM} color={ICON_COLOR} />
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </View>
    </View>
  )
}

export default EditorControls
