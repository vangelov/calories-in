import { MealForm } from 'meals'
import { Flex, FlexProps, useDisclosure } from '@chakra-ui/react'
import Header from './Header'
import { RefObject, memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IngredientsList, useGetIngredientFormStatsTree } from 'ingredients'
import { FoodsDrawer } from 'foods'
import { getStatsTree, useUpdateMealStats } from 'stats'
import PresenceAnimation from './PresenceAnimation'
import useMealFormEvents from './useMealFormEvents'
import { useMemo } from 'react'

type Props = {
  mealForm: MealForm
  index: number
  variantIndex: number
  onRemove: (variantIndex: number, index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  onFirstAppear: (mealForm: MealForm) => void
  selectedVariantFormFieldId: string
  isDragging: boolean
} & FlexProps

function MealItem({
  mealForm,
  index,
  onRemove,
  getMealNameInputRefById,
  variantIndex,
  selectedVariantFormFieldId,
  onFirstAppear,
  isDragging,
  ...rest
}: Props) {
  const foodsDrawerDisclosure = useDisclosure()
  const mealFormEvents = useMealFormEvents({
    mealForm,
    variantIndex,
    index,
    onFirstAppear,
    onRemove,
    foodsDrawerDisclosure,
  })
  const getIngredientFormStatsTree = useGetIngredientFormStatsTree()

  const mealFormStatsTree = useMemo(
    () =>
      getStatsTree({
        id: mealForm.fieldId,
        subtrees: mealForm.ingredientsForms.map(ingredientForm =>
          getIngredientFormStatsTree(ingredientForm)
        ),
      }),
    [mealForm.fieldId, mealForm.ingredientsForms, getIngredientFormStatsTree]
  )

  console.log('meal', variantIndex, index)

  const ingredientsStats = useMemo(
    () => mealFormStatsTree.subtrees.map(({ stats }) => stats),
    [mealFormStatsTree]
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
          shouldAnimate={mealFormEvents.shouldAnimate}
          isVisible={mealFormEvents.isVisible}
          onAnimationComplete={mealFormEvents.onAnimationComplete}
          isDragging={isDragging}
        >
          <Flex
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={provided.draggableProps.style}
            flexDirection="column"
            borderRadius={10}
            borderWidth="1px"
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
              onRemove={mealFormEvents.onRemoveRequest}
              onAddIngredient={foodsDrawerDisclosure.onOpen}
              onClone={mealFormEvents.onClone}
            />

            <IngredientsList
              ingredientsForms={mealForm.ingredientsForms}
              ingredientsStats={ingredientsStats}
              mealFormFieldId={mealForm.fieldId}
              mealIndex={index}
              variantIndex={variantIndex}
              onAddIngredients={foodsDrawerDisclosure.onOpen}
            />

            <FoodsDrawer
              isOpen={foodsDrawerDisclosure.isOpen}
              onClose={foodsDrawerDisclosure.onClose}
              mealName={mealForm.name}
              onSelectedFoods={mealFormEvents.onAddFoods}
            />
          </Flex>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(MealItem)
