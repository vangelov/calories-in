import Header from './Header'
import MealsList, { MealsController } from './MealsList'
import { Box } from '@chakra-ui/react'
import Controls from './Controls'
import { Diet } from 'core/types'
import { DietForm, useDietForm } from 'core/dietForm'
import { FormProvider } from 'react-hook-form'
import { RefObject, useLayoutEffect, useRef } from 'react'
import { FoodsDragAndDropProvider } from 'core/foodsDnd'
import { Watcher } from 'core/undoRedo'

type Props = {
  dietForm: DietForm
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
  scrollRef: RefObject<HTMLDivElement>
  scrollTop: number
}

function Form({
  dietForm,
  onDietChange,
  onNewDiet,
  scrollTop,
  scrollRef,
}: Props) {
  const formMethods = useDietForm(dietForm)
  const mealsControllerRef = useRef<MealsController>()
  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((form: DietForm) => {
    console.log('submit', form)
  })

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTop
    }
  }, [scrollRef, scrollTop])

  function onMealAdd() {
    mealsControllerRef.current?.onMealAdd()
  }

  return (
    <FormProvider {...formMethods}>
      <Watcher />

      <FoodsDragAndDropProvider>
        <Header onNewDiet={onNewDiet} onDietChange={onDietChange} />
        <Controls onMealAdd={onMealAdd} onSave={onSubmit} />

        <Box ref={scrollRef} zIndex={0} flex={1} overflowY="scroll">
          <MealsList mealsControllerRef={mealsControllerRef} />
        </Box>
      </FoodsDragAndDropProvider>
    </FormProvider>
  )
}

export default Form
