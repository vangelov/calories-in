import Header from './Header'
import MealsList, { MealsController } from './MealsList'
import { Box } from '@chakra-ui/react'
import Controls from './Controls'
import { Diet } from 'core/types'
import { DietForm, useDietForm } from 'core/dietForm'
import { FormProvider } from 'react-hook-form'
import { useRef } from 'react'
import { FoodsDragAndDropProvider } from 'core/foodsDnd'
import { Watcher } from 'core/undoRedo'

type Props = {
  dietForm: DietForm
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
}

function Form({ dietForm, onDietChange, onNewDiet }: Props) {
  const formMethods = useDietForm(dietForm)
  const mealsControllerRef = useRef<MealsController>()

  function onMealAdd() {
    mealsControllerRef.current?.onMealAdd()
  }

  return (
    <FormProvider {...formMethods}>
      <Watcher />

      <FoodsDragAndDropProvider>
        <Header onNewDiet={onNewDiet} onDietChange={onDietChange} />
        <Controls onMealAdd={onMealAdd} />

        <Box position="relative" zIndex={0} flex={1} overflow="scroll">
          <MealsList mealsControllerRef={mealsControllerRef} />
        </Box>
      </FoodsDragAndDropProvider>
    </FormProvider>
  )
}

export default Form
