function getVariantFormIndexAfterRemove(
  selectedIndex: number,
  indexToRemove: number
) {
  if (indexToRemove < selectedIndex) {
    return selectedIndex - 1
  }

  if (indexToRemove === selectedIndex && indexToRemove > 0) {
    return indexToRemove - 1
  }

  return selectedIndex
}

export default getVariantFormIndexAfterRemove
