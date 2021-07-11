import { FoodInfo } from 'components/foods'
import { Flex, FlexProps, Box, chakra } from '@chakra-ui/react'
import { Food } from 'core/types'
import { Info } from 'react-feather'
import { MouseEvent } from 'react'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'

const InfoStyled = chakra(Info)

type Props = {
  food: Food
  isSelected?: boolean
  onPreview: () => void
} & FlexProps

function FoodItem({ food, isSelected = false, onPreview, ...rest }: Props) {
  function onClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onPreview()
  }

  return (
    <Box pb={2} {...rest} transition="all 2s linear">
      <Flex
        cursor="pointer"
        _hover={{
          backgroundColor: !isSelected ? 'gray.50' : undefined,
        }}
        position="relative"
        transition="border 150ms ease-out"
        borderColor={isSelected ? 'teal.500' : 'gray.200'}
        backgroundColor={isSelected ? 'gray.50' : 'white'}
        borderWidth="1px"
        borderRadius={4}
        overflow="hidden"
        justifyContent="space-between"
        alignItems="center"
        p={3}
        height="64px"
      >
        <FoodInfo
          fontSize="md"
          nameNoOfLines={1}
          detailText="test"
          food={food}
          energy={food.energy}
        />
        <ResponsiveIconButton
          aria-label="Food details"
          icon={<InfoStyled color="gray.400" pointerEvents="none" />}
          variant="ghost"
          onClick={onClick}
        />
      </Flex>
    </Box>
  )
}

export default FoodItem
