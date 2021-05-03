import { chakra } from '@chakra-ui/system'
import { FoodCategory } from 'core/types'
import { ReactComponent as PoultryIconReact } from './poultry.svg'

const PoultryIcon = chakra(PoultryIconReact)

function getFoodCategoryIcon(foodCategory: FoodCategory) {
  const { id } = foodCategory

  if (id > 0) {
    return PoultryIcon
  }

  throw new Error()
}

export default getFoodCategoryIcon
