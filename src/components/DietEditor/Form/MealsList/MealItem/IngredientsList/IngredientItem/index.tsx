import { Flex } from '@chakra-ui/react'
import { IngredientForm, useDietFormActions } from 'core/diets'
import { Draggable } from 'react-beautiful-dnd'
import { motion } from 'framer-motion'
import { useState, memo, ChangeEvent } from 'react'
import { FoodInfo } from 'components/foods'
import { FoodAmountInput } from 'components/foods'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import RightAligned from 'components/general/RightAligned'
import Menu from './Menu'
import { useFoodsStoreState } from 'core/foods'
import { useOneTimeCheckActions } from 'general/oneTimeCheck'
import { getInsertIngredientFormAnimationKey } from 'core/diets'
import { useScreenSize } from 'components/general/ScreenSizeProvider'
import { Stats } from 'core/stats'

type Props = {
  variantIndex: number
  mealIndex: number
  index: number
  ingredientForm: IngredientForm
  ingredientStats: Stats
  onRemove: (variantIndex: number, mealIndex: number, index: number) => void
}

const variants = {
  open: {
    opacity: 1,
    height: 'auto',
    x: 0,
  },
  collapsed: { opacity: 0, height: 0, x: 0 },
}

function IngredientItem({
  variantIndex,
  mealIndex,
  index,
  ingredientForm,
  ingredientStats,
  onRemove,
}: Props) {
  const [isVisible, setIsVisible] = useState(true)

  const oneTimeCheckActions = useOneTimeCheckActions()
  const dietFormActions = useDietFormActions()
  const screenSize = useScreenSize()
  const amountInputSize = screenSize >= 2 ? 'sm' : 'md'

  function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    dietFormActions.updateIngredientForm(variantIndex, mealIndex, index, {
      amountInGrams: value,
    })
  }

  function onAnimationComplete() {
    if (!isVisible) {
      onRemove(variantIndex, mealIndex, index)
    }
  }

  const pendingAnimationForInserted = oneTimeCheckActions.checkAndReset(
    getInsertIngredientFormAnimationKey(ingredientForm.fieldId)
  )

  const { getFoodById } = useFoodsStoreState()
  const food = getFoodById(ingredientForm.foodId)

  return (
    <Draggable
      key={ingredientForm.fieldId}
      draggableId={ingredientForm.fieldId as string}
      index={index}
    >
      {(provided, snapshot) => (
        <motion.div
          transition={{ ease: 'easeInOut' }}
          style={{
            opacity: pendingAnimationForInserted ? 0 : 1,
          }}
          initial={pendingAnimationForInserted ? 'collapsed' : false}
          animate={isVisible ? 'open' : 'collapsed'}
          onAnimationComplete={onAnimationComplete}
          variants={variants}
        >
          <Flex
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
            boxShadow={snapshot.isDragging ? 'lg' : undefined}
            bg={snapshot.isDragging ? 'white' : undefined}
            alignItems="center"
            position="relative"
            py={2}
            _hover={{ backgroundColor: 'gray.50' }}
          >
            <StatsLayout
              prefersAmount={true}
              nameElement={
                <FoodInfo
                  ml={3}
                  fontSize={{ base: 'sm', md: 'md' }}
                  food={food}
                />
              }
              amountElement={
                <RightAligned>
                  <FoodAmountInput
                    size={amountInputSize}
                    onChange={onAmountChange}
                    value={ingredientForm.amountInGrams}
                  />
                </RightAligned>
              }
              energyElement={
                <Stat type="ingredientEnergy" value={ingredientStats.energy} />
              }
              proteinElement={
                <Stat type="ingredient" value={ingredientStats.protein} />
              }
              carbsElement={
                <Stat type="ingredient" value={ingredientStats.carbs} />
              }
              fatElement={
                <Stat type="ingredient" value={ingredientStats.fat} />
              }
              menuElement={<Menu mr={3} onRemove={() => setIsVisible(false)} />}
            />
          </Flex>
        </motion.div>
      )}
    </Draggable>
  )
}

export default memo(IngredientItem)
