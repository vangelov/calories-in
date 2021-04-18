import FoodsCategoriesList from './FoodsCategoriesList'
import { Flex, Box } from '@chakra-ui/react'

function Sidebar() {
  return (
    <Flex height="100%" flexDirection="column">
      <Box height="130px" />
      <FoodsCategoriesList flex={1} />
    </Flex>
  )
}

export default Sidebar
