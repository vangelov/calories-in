import { FoodInfo } from 'components/foods'
import { Flex, FlexProps, Box, chakra } from '@chakra-ui/react'
import { Food } from 'core/types'
import { Info } from 'react-feather'
import { MouseEvent } from 'react'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DisappearingBox from './DisappearingBox'
import AnimateAppear from './AnimateAppear'

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

  const one = useOneTimeCheckActions()
  const shouldAnimate = one.checkAndReset(`test-${food.id}`)

  return (
    <Box pb={2} {...rest}>
      <AnimateAppear shouldAnimate={shouldAnimate}>
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
          <DisappearingBox shouldAnimate={shouldAnimate} />

          <FoodInfo
            fontSize="md"
            nameNoOfLines={1}
            detailText="test"
            food={food}
            energy={food.energy}
            position="relative"
            zIndex={1}
          />
          <ResponsiveIconButton
            aria-label="Food details"
            icon={<InfoStyled color="gray.400" pointerEvents="none" />}
            variant="ghost"
            onClick={onClick}
            position="relative"
            zIndex={1}
          />
        </Flex>
      </AnimateAppear>
    </Box>
  )
}

export default FoodItem
