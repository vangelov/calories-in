import { Tag, TagLabel, TagCloseButton, Fade } from '@chakra-ui/react'
import { Food } from 'foods'

type Props = {
  food: Food
  onUnselect: (food: Food) => void
}

function SelectedFoodItem({ food, onUnselect }: Props) {
  return (
    <Fade in={true}>
      <Tag
        size="md"
        borderRadius="full"
        variant="outline"
        colorScheme="teal"
        maxWidth="250px"
      >
        <TagLabel>{food.name}</TagLabel>
        <TagCloseButton onClick={() => onUnselect(food)} />
      </Tag>
    </Fade>
  )
}

export default SelectedFoodItem
