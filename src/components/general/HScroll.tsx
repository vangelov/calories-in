import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useRef,
  useEffect,
} from 'react'
import styled from '@emotion/styled'
import { useMergeRefs } from '@chakra-ui/hooks'
import { Flex, Box } from '@chakra-ui/react'

type ShadowProps = {
  showStart: boolean
  showEnd: boolean
  children: ReactNode
}

function getLinearGradient(direction: 'left' | 'right') {
  return `linear-gradient(to ${direction},rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))`
}

const shadowElementBase = {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '50px',
  zIndex: 1,
}

function ShadowBox2({ showStart, showEnd, children }: ShadowProps) {
  const before = {
    ...shadowElementBase,
    left: 0,
    background: getLinearGradient('right'),
  }

  const after = {
    ...shadowElementBase,
    right: 0,
    background: getLinearGradient('left'),
  }

  return (
    <Box
      position="relative"
      flex={1}
      overflow="hidden"
      _before={showStart ? before : undefined}
      _after={showEnd ? after : undefined}
    >
      {children}
    </Box>
  )
}

const ScrollFlex = styled(Flex)`
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

type Props = {
  children: ReactNode
  forwardRef?: ForwardedRef<HTMLDivElement>
  onScrollStateChange: (
    isScrollable: boolean,
    canScrollLeft: boolean,
    canScrollRight: boolean
  ) => void
}

const HScroll = ({ children, forwardRef, onScrollStateChange }: Props) => {
  const [showStart, setShowStart] = React.useState(false)
  const [showEnd, setShowEnd] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number>()

  const onMousewheel = (event: WheelEvent) => {
    const { deltaX } = event

    if ((deltaX < 0 && !showStart) || (deltaX > 0 && !showEnd)) {
      event.preventDefault()
    }
  }

  const onScroll = () => {
    const { scrollWidth = 0, scrollLeft = 0, offsetWidth = 0 } =
      ref.current || {}

    setShowStart(scrollLeft > 0)
    setShowEnd(scrollLeft + offsetWidth + 1 < scrollWidth)
  }

  const node = ref.current

  React.useEffect(() => {
    onScroll()

    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(onScroll, 300)

    node?.addEventListener('scroll', onScroll)
    node?.addEventListener('wheel', onMousewheel)
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('resize', onScroll)
      node?.removeEventListener('scroll', onScroll)
      node?.removeEventListener('wheel', onMousewheel)

      window.clearTimeout(timeoutRef.current)
    }
  })

  useEffect(() => {
    const { scrollWidth = 0, offsetWidth = 0 } = ref.current || {}

    onScrollStateChange(offsetWidth < scrollWidth, showStart, showEnd)
  })

  const finalRef = useMergeRefs(ref, forwardRef)

  return (
    <ShadowBox2 showEnd={showEnd} showStart={showStart}>
      <ScrollFlex overflowY="scroll" ref={finalRef}>
        {children}
      </ScrollFlex>
    </ShadowBox2>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <HScroll {...props} forwardRef={ref} />
))
