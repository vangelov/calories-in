import { useState } from 'react'

function useScrollState() {
  const [showsScrollButtons, setShowsScrollButtons] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function onScrollStateChange(
    isScrollable: boolean,
    canScrollLeft: boolean,
    canScrollRight: boolean
  ) {
    setCanScrollLeft(canScrollLeft)
    setCanScrollRight(canScrollRight)
    setShowsScrollButtons(isScrollable)
  }

  return {
    showsScrollButtons,
    canScrollLeft,
    canScrollRight,
    onScrollStateChange,
  }
}

export default useScrollState
