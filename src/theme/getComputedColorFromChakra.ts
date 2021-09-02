/* React-pdf does not have access to the Chakra context so we
   use the css variables to get the actual color values*/
function getComputedColorFromChakra(chakraColor: string) {
  const computedStyle = getComputedStyle(document.documentElement)
  const colorName = chakraColor.split('.').join('-')
  const propertyName = `--chakra-colors-${colorName}`

  return computedStyle.getPropertyValue(propertyName)
}

export default getComputedColorFromChakra
