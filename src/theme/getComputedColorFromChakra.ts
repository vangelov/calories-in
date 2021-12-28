/* React-pdf does not have access to the Chakra context so we
   use the css variables to get the actual color values*/
function getComputedColorFromChakra(chakraColor: string) {
  return 'red'
}

export default getComputedColorFromChakra
