import Svg, { Path, Rect } from 'react-native-svg'
import icons from './icons'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const renderElement = (el, index) => {
  if (el.tag === 'path') {
    return (
      <Path
        key={index}
        d={el.d}
        fillRule={el.fillRule}
        clipRule={el.clipRule}
      />
    )
  }

  if (el.tag === 'rect') {
    return (
      <Rect
        key={index}
        x={el.x}
        y={el.y}
        width={el.width}
        height={el.height}
        rx={el.rx}
      />
    )
  }

  return null
}

const Icon = ({ name, size = ICON_SIZE, color = ICON_COLOR }) => {
  const icon = icons[name]
  if (!icon) return null

  const isStroke = icon.type === 'stroke'

  return (
    <Svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill={isStroke ? 'none' : color}
      stroke={isStroke ? color : 'none'}
      strokeWidth={isStroke ? (icon.strokeWidth || 2) : 0}
      strokeLinecap={isStroke ? 'round' : undefined}
      strokeLinejoin={isStroke ? 'round' : undefined}
    >
      {icon.elements.map((el, i) => renderElement(el, i))}
    </Svg>
  )
}

export default Icon
