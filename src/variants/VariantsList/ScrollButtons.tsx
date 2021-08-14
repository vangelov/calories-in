import { Fade } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { ResponsiveIconButton } from 'general'
import { animateScrollLeft } from 'dom'
import { RefObject } from 'react'

type Props = {
  scrollNodeRef: RefObject<HTMLDivElement>
  showsButtons: boolean
  canScrollLeft: boolean
  canScrollRight: boolean
}

const SCROLL_DELTA = 100

function ScrollButtons({
  showsButtons,
  scrollNodeRef,
  canScrollLeft,
  canScrollRight,
}: Props) {
  function onTest() {
    animateScrollLeft(scrollNodeRef, SCROLL_DELTA)
  }

  function onTest2() {
    animateScrollLeft(scrollNodeRef, -SCROLL_DELTA)
  }

  return (
    <Fade in={showsButtons} unmountOnExit={true}>
      <ResponsiveIconButton
        borderTopLeftRadius="full"
        borderBottomLeftRadius="full"
        size="sm"
        aria-label="Add variant"
        icon={<ArrowLeft size={20} pointerEvents="none" />}
        variant="outline"
        onClick={onTest2}
        isResponsive={false}
        ml={3}
        flexShrink={0}
        isDisabled={!canScrollLeft}
      />
      <ResponsiveIconButton
        borderTopRightRadius="full"
        borderBottomRightRadius="full"
        size="sm"
        aria-label="Add variant"
        icon={<ArrowRight size={20} pointerEvents="none" />}
        variant="outline"
        onClick={onTest}
        isResponsive={false}
        flexShrink={0}
        isDisabled={!canScrollRight}
      />
    </Fade>
  )
}

export default ScrollButtons
