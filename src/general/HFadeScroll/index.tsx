import {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useRef,
  useEffect,
  useState,
} from 'react'
import ScrollContainer from './ScrollContainer'
import FadeBox from './FadeBox'
import { useMergeRefs } from '@chakra-ui/hooks'

type Props = {
  children: ReactNode
  forwardedRef?: ForwardedRef<HTMLDivElement>
  onScrollStateChange: (
    isScrollable: boolean,
    canScrollLeft: boolean,
    canScrollRight: boolean
  ) => void
}

const HFadeScroll = ({
  children,
  forwardedRef,
  onScrollStateChange,
}: Props) => {
  const [hasStartFade, setHasStartFade] = useState(false)
  const [hasEndFade, setHasEndFade] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number>()

  function onMousewheel(event: WheelEvent) {
    const { deltaX } = event

    if ((deltaX < 0 && !hasStartFade) || (deltaX > 0 && !hasEndFade)) {
      event.preventDefault()
    }
  }

  function onScroll() {
    if (scrollContainerRef.current) {
      const {
        scrollWidth,
        scrollLeft,
        offsetWidth,
      } = scrollContainerRef.current

      setHasStartFade(scrollLeft > 0)
      setHasEndFade(scrollLeft + offsetWidth + 1 < scrollWidth)
    }
  }

  useEffect(() => {
    onScroll()

    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(onScroll, 300)

    const scrollContainerNode = scrollContainerRef.current

    scrollContainerNode?.addEventListener('scroll', onScroll)
    scrollContainerNode?.addEventListener('wheel', onMousewheel)
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('resize', onScroll)
      scrollContainerNode?.removeEventListener('scroll', onScroll)
      scrollContainerNode?.removeEventListener('wheel', onMousewheel)

      window.clearTimeout(timeoutRef.current)
    }
  })

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, offsetWidth } = scrollContainerRef.current
      onScrollStateChange(offsetWidth < scrollWidth, hasStartFade, hasEndFade)
    }
  })

  const finalScrollContainerRef = useMergeRefs(scrollContainerRef, forwardedRef)

  return (
    <FadeBox hasStartFade={hasStartFade} hasEndFade={hasEndFade}>
      <ScrollContainer overflowY="scroll" ref={finalScrollContainerRef}>
        {children}
      </ScrollContainer>
    </FadeBox>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <HFadeScroll {...props} forwardedRef={ref} />
))
