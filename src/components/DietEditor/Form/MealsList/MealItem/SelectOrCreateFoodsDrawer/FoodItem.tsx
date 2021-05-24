import FoodInfo from 'components/general/FoodInfo'

import { Flex, FlexProps, Box, IconButton, chakra } from '@chakra-ui/react'
import { Food } from 'core/types'
import { Info } from 'react-feather'

const InfoStyled = chakra(Info)

type Props = {
  food: Food
} & FlexProps
function FoodItem({ food, ...rest }: Props) {
  return (
    <Box pb={2} {...rest}>
      <Flex
        cursor="pointer"
        _hover={{
          backgroundColor: 'gray.50',

          borderColor: 'green.500',
        }}
        position="relative"
        border="solid"
        borderColor="gray.400"
        borderWidth="1px"
        borderRadius={4}
        overflow="hidden"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        height="74px"
      >
        <FoodInfo nameNoOfLines={2} detailText="test" food={food} />
        <IconButton
          aria-label="test"
          icon={<InfoStyled color="gray.400" pointerEvents="none" />}
          variant="outline"
        />
      </Flex>
    </Box>
  )
}

export default FoodItem
