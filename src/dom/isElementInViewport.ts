function isElementInViewport(element: Element) {
  const { top, left, bottom, right } = element.getBoundingClientRect()

  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export default isElementInViewport
