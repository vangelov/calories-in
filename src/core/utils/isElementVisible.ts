function isElementVisible(element: Element, container: Element) {
  const { bottom, height, top } = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  return top <= containerRect.top
    ? containerRect.top - top <= height
    : bottom - containerRect.bottom <= height
}

export default isElementVisible
