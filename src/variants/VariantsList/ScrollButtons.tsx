import { Fade, IconButton } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight } from 'react-feather'
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
      <IconButton
        bg="white"
        borderTopLeftRadius="full"
        borderBottomLeftRadius="full"
        size="md"
        aria-label="Add variant"
        icon={<ArrowLeft size={20} pointerEvents="none" />}
        variant="outline"
        onClick={onTest2}
        ml={3}
        flexShrink={0}
        isDisabled={!canScrollLeft}
      />
      <IconButton
        bg="white"
        borderTopRightRadius="full"
        borderBottomRightRadius="full"
        size="md"
        aria-label="Add variant"
        icon={<ArrowRight size={20} pointerEvents="none" />}
        variant="outline"
        onClick={onTest}
        flexShrink={0}
        isDisabled={!canScrollRight}
      />
    </Fade>
  )
}

export default ScrollButtons
