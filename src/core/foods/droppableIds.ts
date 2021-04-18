import { FoodCategory } from 'core/types'
import { DroppableId } from 'react-beautiful-dnd'

const DROPABLE_ID_PREFIX = 'FoodCategory-'

function getFoodCategoryDroppableId(foodCategory: FoodCategory): DroppableId {
  return `${DROPABLE_ID_PREFIX}-${foodCategory.id}`
}

function isFoodCategoryDroppableId(droppableId: DroppableId) {
  return droppableId.startsWith(DROPABLE_ID_PREFIX)
}

export { getFoodCategoryDroppableId, isFoodCategoryDroppableId }
