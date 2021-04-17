import FoodsList from './FoodsList'
import { Flex, Box } from '@chakra-ui/react'

function Sidebar() {
  return (
    <Flex height="100%" flexDirection="column">
      <Box height="130px" />
      <FoodsList flex={1} />
    </Flex>
  )
}

export default Sidebar
