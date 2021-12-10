import { Food } from 'foods'
import { Text, Flex, FlexProps, Box, Image } from '@chakra-ui/react'
import { Stat } from 'stats'

type Props = {
  food: Food

  onChoose: (food: Food) => void
} & FlexProps

function MealItem({ food, onChoose, ...rest }: Props) {
  return (
    <Box pb={2} onClick={() => onChoose(food)} {...rest}>
      <Box
        cursor="pointer"
        _hover={{
          backgroundColor: 'gray.50',
        }}
        position="relative"
        borderWidth="1px"
        borderRadius={6}
        justifyContent="space-between"
        p={3}
        height="93px"
      >
        <Flex>
          <Image
            src="https://myplate-prod.azureedge.net/sites/default/files/styles/recipe_525_x_350_/public/2021-01/2%20step%20chicken.jpg?itok=yqfpzbp8"
            objectFit="cover"
            borderRadius={6}
            width="65px"
            height="65px"
            alignSelf="stretch"
          />
          <Box ml={2} flex={1}>
            <Text fontSize="md" mb={1} fontWeight="semibold">
              Noney Mustard Dressing
            </Text>
            <Flex width="100%" justifyContent="space-between">
              <Stat
                type="mealEnergy"
                label="Calories"
                value={100}
                alignItems="flex-start"
              />
              <Stat
                type="meal"
                label="Protein"
                value={100}
                alignItems="flex-start"
              />
              <Stat
                type="meal"
                label="Carbs"
                value={100}
                alignItems="flex-start"
              />
              <Stat
                type="meal"
                label="Fat"
                value={100}
                alignItems="flex-start"
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default MealItem
