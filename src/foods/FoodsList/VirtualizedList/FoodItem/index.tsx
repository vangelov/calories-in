import { FoodInfo, Food } from 'foods'
import { Flex, FlexProps, Box, chakra, IconButton } from '@chakra-ui/react'
import { Info } from 'react-feather'
import { MouseEvent } from 'react'
import { useOneTimeCheckActions, Tooltip } from 'general'
import DisappearingBox from './DisappearingBox'
import AnimateAppear from './AnimateAppear'

const InfoStyled = chakra(Info)

type UsageType = 'selectOrPreview' | 'previewOnly' | 'nonInteractive'

type Props = {
  food: Food
  isSelected?: boolean
  onPreview: (food: Food) => void
  onChoose: (food: Food) => void
  usageType?: UsageType
} & FlexProps

function FoodItem({
  food,
  isSelected = false,
  onPreview,
  onChoose,
  usageType = 'selectOrPreview',
  ...rest
}: Props) {
  function onInfoButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    onPreview(food)
  }

  const oneTimeCheckActions = useOneTimeCheckActions()
  const shouldAnimateAppear = oneTimeCheckActions.checkAndReset(
    `food-appear-${food.id}`
  )
  const shouldAnimateFlash = oneTimeCheckActions.checkAndReset(
    `food-flash-${food.id}`
  )

  return (
    <Box
      pb={2}
      onClick={() => {
        if (usageType === 'previewOnly') {
          onPreview(food)
        } else if (usageType === 'selectOrPreview') {
          onChoose(food)
        }
      }}
      {...rest}
    >
      <AnimateAppear shouldAnimate={shouldAnimateAppear}>
        <Flex
          cursor={usageType !== 'nonInteractive' ? 'pointer' : undefined}
          _hover={
            usageType !== 'nonInteractive'
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
          borderRadius={6}
          overflow="hidden"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          height="64px"
        >
          {shouldAnimateFlash && (
            <DisappearingBox shouldAnimate={shouldAnimateFlash} />
          )}

          <FoodInfo
            nameNoOfLines={1}
            food={food}
            energy={food.energy}
            position="relative"
            zIndex={1}
          />
          {usageType === 'selectOrPreview' && (
            <Tooltip label="Food details">
              <IconButton
                aria-label="Food details"
                icon={<InfoStyled size={20} pointerEvents="none" />}
                variant="ghost"
                onClick={onInfoButtonClick}
                position="relative"
                zIndex={1}
              />
            </Tooltip>
          )}
        </Flex>
      </AnimateAppear>
    </Box>
  )
}

export type { UsageType }

export default FoodItem
