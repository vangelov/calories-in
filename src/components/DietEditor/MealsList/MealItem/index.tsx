import { MealForm } from 'core/diets'
import { Flex, LayoutProps, SpaceProps, useDisclosure } from '@chakra-ui/react'
import Header from './Header'
import { RefObject, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { getInsertMealFormAnimationKey } from 'core/diets'
import { Draggable } from 'react-beautiful-dnd'
import IngredientsList from './IngredientsList'
import SelectFoodsDrawer from './SelectFoodsDrawer'
import { useFoods } from 'core/foods'
import { useIngredientsStats, useUpdateMealStats } from 'core/stats'

type Props = {
  mealForm: MealForm
  index: number
  variantIndex: number
  onRemove: (variantIndex: number, index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLInputElement>
  onFirstAppear: (mealForm: MealForm) => void
  selectedVariantFormFieldId: string
} & LayoutProps &
  SpaceProps

const variants = {
  open: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
  collapsed: { opacity: 0, height: 0, x: 0 },
}

function MealItem({
  mealForm,
  index,
  onRemove,
  getMealNameInputRefById,
  variantIndex,
  selectedVariantFormFieldId,
  onFirstAppear,
  ...rest
}: Props) {
  const [isVisible, setIsVisible] = useState(true)
  const oneTimeCheckActions = useOneTimeCheckActions()
  const drawerDisclosure = useDisclosure()
  const { foodsById } = useFoods()

  function onAnimationComplete() {
    if (pendingAnimationForInserted) {
      onFirstAppear(mealForm)
    } else if (!isVisible) {
      onRemove(variantIndex, index)
    }
  }

  const pendingAnimationForInserted = oneTimeCheckActions.checkAndReset(
    getInsertMealFormAnimationKey(mealForm.fieldId)
  )

  const { ingredientsStats, ingredientsStatsSum } = useIngredientsStats(
    mealForm.ingredientsForms,
    foodsById
  )

  useUpdateMealStats({ ingredientsStatsSum, selectedVariantFormFieldId, index })

  return (
    <Draggable
      key={mealForm.fieldId}
      draggableId={mealForm.fieldId}
      index={index}
    >
      {(provided, snapshot) => (
        <motion.div
          transition={{
            ease: 'easeInOut',
            duration: pendingAnimationForInserted ? 0.12 : undefined,
          }}
          style={{
            opacity: pendingAnimationForInserted ? 0 : 1,
          }}
          initial={pendingAnimationForInserted ? 'hidden' : false}
          animate={isVisible ? 'open' : 'collapsed'}
          onAnimationComplete={onAnimationComplete}
          variants={variants}
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
              ingredientsStatsSum={ingredientsStatsSum}
              getMealNameInputRefById={getMealNameInputRefById}
              index={index}
              mealForm={mealForm}
              onRemove={() => setIsVisible(false)}
              onAddIngredient={drawerDisclosure.onOpen}
            />

            <IngredientsList
              ingredientsForms={mealForm.ingredientsForms}
              ingredientsStats={ingredientsStats}
              mealForm={mealForm}
              mealIndex={index}
              variantIndex={variantIndex}
              onAddIngredients={drawerDisclosure.onOpen}
            />

            <SelectFoodsDrawer
              isOpen={drawerDisclosure.isOpen}
              onClose={drawerDisclosure.onClose}
              mealName={mealForm.name}
              mealFormIndex={index}
              variantFormIndex={variantIndex}
            />
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default memo(MealItem)
