import Svg, { Path, Rect } from 'react-native-svg'
import icons from './icons'
import { ICON_SIZE, ICON_COLOR } from '@/constants/theme'

const renderElement = (el, index, color) => {
  // Per-element overrides (used by mixed fill/stroke icons like timer)
  const overrides = {}
  if (el.fill !== undefined) overrides.fill = el.fill === 'color' ? color : el.fill
  if (el.stroke !== undefined) overrides.stroke = el.stroke === 'color' ? color : el.stroke
  if (el.strokeWidth !== undefined) overrides.strokeWidth = el.strokeWidth
  if (el.strokeLinecap !== undefined) overrides.strokeLinecap = el.strokeLinecap
  if (el.strokeLinejoin !== undefined) overrides.strokeLinejoin = el.strokeLinejoin

  if (el.tag === 'path') {
    return (
      <Path
        key={index}
        d={el.d}
        fillRule={el.fillRule}
        clipRule={el.clipRule}
        {...overrides}
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
        {...overrides}
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
      {icon.elements.map((el, i) => renderElement(el, i, color))}
    </Svg>
  )
}

export default Icon
