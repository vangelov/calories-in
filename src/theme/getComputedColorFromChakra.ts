/* React-pdf does not have access to the Chakra context so we
   use the css variables to get the actual color values*/

const map: Record<string, string> = {
  'gray.50': '#F7FAFC',
  'teal.500': '#319795',
  'teal.400': '#38B2AC',
  'gray.400': '#A0AEC0',
  'gray.600': '#4A5568',
  'gray.500': '#718096',
  'gray.100': '#EDF2F7',
  'gray.200': '#E2E8F0',
  'gray.300': '#CBD5E0',
  'teal.600': '#2C7A7B',
}
function getComputedColorFromChakra(chakraColor: string) {
  return map[chakraColor]
}

export default getComputedColorFromChakra
