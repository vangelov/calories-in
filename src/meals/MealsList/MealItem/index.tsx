import { MealForm } from 'meals'
import { Flex, FlexProps, useDisclosure, Divider, Box } from '@chakra-ui/react'
import Header from './Header'
import { RefObject, memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IngredientsList } from 'ingredients'
import { FoodsDrawer } from 'foods'
import PresenceAnimation from './PresenceAnimation'
import useMealFormEvents from './useMealFormEvents'
import { EditNotesModal } from 'notes'
import Notes from './Notes'
import useGetAndUpdateStats from './useGetAndUpdateStats'

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
  const editNotesModalDisclosure = useDisclosure()

  const { mealFormStatsTree, ingredientsStats } = useGetAndUpdateStats({
    mealForm,
    index,
    selectedVariantFormFieldId,
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
            backgroundColor="white"
            boxShadow={
              snapshot.isDragging
                ? 'rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px'
                : 'base'
            }
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
              onEditNotes={editNotesModalDisclosure.onOpen}
            />

            <Box px={3}>
              <Divider />
            </Box>

            <IngredientsList
              ingredientsForms={mealForm.ingredientsForms}
              ingredientsStats={ingredientsStats}
              mealFormFieldId={mealForm.fieldId}
              mealIndex={index}
              variantIndex={variantIndex}
              onAddIngredients={foodsDrawerDisclosure.onOpen}
              shouldAddRadiusToLastBottomBorder={!mealForm.notes}
            />

            {mealForm.notes && <Notes notes={mealForm.notes} />}

            <EditNotesModal
              isOpen={editNotesModalDisclosure.isOpen}
              onClose={editNotesModalDisclosure.onClose}
              notes={mealForm.notes}
              onEditNotes={mealFormEvents.onEditNotes}
              fieldId={mealForm.fieldId}
              ownerName={mealForm.name}
              size="xl"
              textAreaHeight="150px"
            />

            <FoodsDrawer
              isOpen={foodsDrawerDisclosure.isOpen}
              onClose={foodsDrawerDisclosure.onClose}
              mealName={mealForm.name}
              mealForm={mealForm}
              onSelectedFoods={mealFormEvents.onAddFoods}
            />
          </Flex>
        </PresenceAnimation>
      )}
    </Draggable>
  )
}

export default memo(MealItem)
