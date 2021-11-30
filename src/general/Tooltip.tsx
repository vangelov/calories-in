import { ReactElement, useState, cloneElement, useRef, ReactNode } from 'react'
import { Tooltip as TooltipBase } from '@chakra-ui/react'

type Props = {
  children: ReactElement
  delay?: number
  label?: ReactNode
  isActive?: boolean
}

function Tooltip({ children, label, isActive = true, delay = 500 }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const timeoutIdRef = useRef<number>()

  function onMouseEnter() {
    window.clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = window.setTimeout(() => setIsHovered(true), delay)
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

  if (!isActive) {
    return children
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
