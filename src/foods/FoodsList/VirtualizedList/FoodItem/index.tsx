import { FoodInfo } from 'foods'
import { Flex, FlexProps, Box, chakra } from '@chakra-ui/react'
import { Food } from 'foods'
import { Info } from 'react-feather'
import { MouseEvent } from 'react'
import { ResponsiveIconButton } from 'general'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import DisappearingBox from './DisappearingBox'
import AnimateAppear from './AnimateAppear'

const InfoStyled = chakra(Info)

type Props = {
  food: Food
  isSelected?: boolean
  isInteractive?: boolean
  onPreview: () => void
} & FlexProps

function FoodItem({
  food,
  isSelected = false,
  onPreview,
  isInteractive = true,
  ...rest
}: Props) {
  function onClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onPreview()
  }

  const one = useOneTimeCheckActions()
  const shouldAnimate = one.checkAndReset(`test-${food.id}`)
  const shouldAnimate2 = one.checkAndReset(`test2-${food.id}`)

  return (
    <Box pb={2} {...rest}>
      <AnimateAppear shouldAnimate={shouldAnimate}>
        <Flex
          cursor={isInteractive ? 'pointer' : undefined}
          _hover={
            isInteractive
              ? {
                  backgroundColor: !isSelected ? 'gray.50' : undefined,
                }
              : undefined
          }
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
          {shouldAnimate2 && <DisappearingBox shouldAnimate={shouldAnimate2} />}

          <FoodInfo
            fontSize="md"
            nameNoOfLines={1}
            detailText="test"
            food={food}
            energy={food.energy}
            position="relative"
            zIndex={1}
          />
          {isInteractive && (
            <ResponsiveIconButton
              aria-label="Food details"
              icon={<InfoStyled color="gray.400" pointerEvents="none" />}
              variant="ghost"
              onClick={onClick}
              position="relative"
              zIndex={1}
            />
          )}
        </Flex>
      </AnimateAppear>
    </Box>
  )
}

export default FoodItem
