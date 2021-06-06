import { Tag, TagLabel, TagCloseButton, Fade } from '@chakra-ui/react'
import { Food } from 'core/types'

type Props = {
  food: Food
  onUnselect: (food: Food) => void
}

function SelectedFoodItem({ food, onUnselect }: Props) {
  return (
    <Fade in={true}>
      <Tag size="md" borderRadius="full" variant="outline" m={1}>
        <TagLabel>{food.name}</TagLabel>
        <TagCloseButton onClick={() => onUnselect(food)} />
      </Tag>
    </Fade>
  )
}

export default SelectedFoodItem
