import { Text, Flex, FlexProps, Box, Image } from '@chakra-ui/react'
import { Stat } from 'stats'
import { Recipe } from 'recipes'

type Props = {
  recipe: Recipe
  onChoose: (recipe: Recipe) => void
} & FlexProps

function RecipeItem({ recipe, onChoose, ...rest }: Props) {
  const { imageUrl, name, energy, protein, carbs, fat } = recipe

  return (
    <Box pb={2} onClick={() => onChoose(recipe)} {...rest}>
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
            src={imageUrl}
            objectFit="cover"
            borderRadius={6}
            width="65px"
            height="65px"
            alignSelf="stretch"
          />
          <Box ml={2} flex={1}>
            <Text fontSize="md" mb={1} fontWeight="semibold">
              {name}
            </Text>
            <Flex width="100%" justifyContent="space-between">
              <Stat
                type="mealEnergy"
                label="Calories"
                value={energy}
                alignItems="flex-start"
              />
              <Stat
                type="meal"
                label="Protein"
                value={protein}
                alignItems="flex-start"
              />
              <Stat
                type="meal"
                label="Carbs"
                value={carbs}
                alignItems="flex-start"
              />
              <Stat
                type="meal"
                label="Fat"
                value={fat}
                alignItems="flex-start"
              />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default RecipeItem
