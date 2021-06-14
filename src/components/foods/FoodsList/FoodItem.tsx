import { FoodInfo } from 'components/foods'
import { transparentize } from '@chakra-ui/theme-tools'
import { Flex, FlexProps, Box, chakra } from '@chakra-ui/react'
import { Food } from 'core/types'
import { Info } from 'react-feather'
import { MouseEvent } from 'react'
import { ResponsiveIconButton } from 'components/general'

const InfoStyled = chakra(Info)

type Props = {
  food: Food
  isSelected?: boolean
} & FlexProps

function FoodItem({ food, isSelected = false, ...rest }: Props) {
  function onClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
  }
  return (
    <Box pb={2} {...rest}>
      <Flex
        cursor="pointer"
        _hover={{
          backgroundColor: !isSelected
            ? transparentize('gray.50', 0.35)
            : undefined,
        }}
        position="relative"
        border="solid"
        borderColor={isSelected ? 'custom.500' : 'gray.200'}
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
