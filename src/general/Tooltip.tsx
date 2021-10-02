import { ReactElement, useState, cloneElement, useRef } from 'react'
import { Tooltip as TooltipBase } from '@chakra-ui/react'

type Props = {
  children: ReactElement
  label: string
}

function Tooltip({ children, label }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const timeoutIdRef = useRef<number>()

  function onMouseEnter() {
    window.clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = window.setTimeout(() => setIsHovered(true), 500)
  }

  function hideTooltip() {
    window.clearTimeout(timeoutIdRef.current)
    setIsHovered(false)
  }

  function onMouseLeave() {
    hideTooltip()
  }

  function onClick(...rest: any) {
    children.props.onClick && children.props.onClick(...rest)
    hideTooltip()
  }

  return (
    <TooltipBase hasArrow={true} isOpen={isHovered} label={label}>
      {cloneElement(children, {
        onMouseEnter,
        onMouseLeave,
        onClick,
      })}
    </TooltipBase>
  )
}

export default Tooltip
