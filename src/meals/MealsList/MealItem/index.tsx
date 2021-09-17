import { MealForm, getMealFormStatsTree } from 'meals'
import { Flex, LayoutProps, SpaceProps, useDisclosure } from '@chakra-ui/react'
import Header from './Header'
import { RefObject, memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IngredientsList } from 'ingredients'
import { Food, SelectFoodsDrawer } from 'foods'
import { useFoods } from 'foods'
import { useUpdateMealStats } from 'stats'
import PresenceAnimation from './PresenceAnimation'
import useActions from './useActions'
import { useMemo } from 'react'

type Props = {
  mealForm: MealForm
  index: number
  variantIndex: number
  onRemove: (variantIndex: number, index: number) => void
  onViewFoodDetails: (food: Food) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  onFirstAppear: (mealForm: MealForm) => void
  selectedVariantFormFieldId: string
} & LayoutProps &
  SpaceProps

function MealItem({
  mealForm,
  index,
  onRemove,
  getMealNameInputRefById,
  variantIndex,
  selectedVariantFormFieldId,
  onFirstAppear,
  onViewFoodDetails,
  ...rest
}: Props) {
  const drawerDisclosure = useDisclosure()
  const { foodsById } = useFoods()
  const actions = useActions({
    mealForm,
    variantIndex,
    index,
    onFirstAppear,
    onRemove,
  })

  const mealFormStatsTree = useMemo(
    () => getMealFormStatsTree(mealForm, foodsById),
    [mealForm, foodsById]
  )

  useUpdateMealStats({
    stats: mealFormStatsTree.stats,
    selectedVariantFormFieldId,
    index,
  })

  return (
    <Draggable
      key={mealForm.fieldId}
      draggableId={mealForm.fieldId}
      index={index}
    >
      {(provided, snapshot) => (
        <PresenceAnimation
          shouldAnimate={actions.shouldAnimate}
          isVisible={actions.isVisible}
          onAnimationComplete={actions.onAnimationComplete}
        >
          <Flex
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={provided.draggableProps.style}
            flexDirection="column"
            borderRadius={10}
            borderWidth="1px"
            mb={3}
            backgroundColor="white"
            boxShadow={snapshot.isDragging ? 'lg' : undefined}
            {...rest}
          >
            <Header
              {...provided.dragHandleProps}
              variantIndex={variantIndex}
              ingredientsStatsSum={mealFormStatsTree.stats}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              mealForm={mealForm}
              onRemove={actions.onRemoveRequest}
              onAddIngredient={drawerDisclosure.onOpen}
            />

            <IngredientsList
              ingredientsForms={mealForm.ingredientsForms}
              ingredientsStats={mealFormStatsTree.subtrees.map(
                ({ stats }) => stats
              )}
              mealForm={mealForm}
              mealIndex={index}
              variantIndex={variantIndex}
              onAddIngredients={drawerDisclosure.onOpen}
              onViewFoodDetails={onViewFoodDetails}
            />

            <SelectFoodsDrawer
              isOpen={drawerDisclosure.isOpen}
              onClose={drawerDisclosure.onClose}
              mealName={mealForm.name}
              mealFormIndex={index}
              variantFormIndex={variantIndex}
            />
          </Flex>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(MealItem)
