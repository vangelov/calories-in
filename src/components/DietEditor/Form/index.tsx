import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import { Box, Divider, Flex } from '@chakra-ui/react'
import Controls from './Controls'
import { Diet } from 'core/types'
import { DietForm, useDietForm, MealsFieldArray } from 'core/dietForm'
import { FormProvider } from 'react-hook-form'
import { useLayoutEffect, useRef } from 'react'
import { IngredientsFormsDndProvider } from 'core/ingredientsDnd'
import { Watcher } from 'core/undoRedo'

type Props = {
  dietForm: DietForm
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
  scrollTop: number
  isEditingExistingDiet: boolean
}

function Form({
  dietForm,
  onDietChange,
  onNewDiet,
  scrollTop,

  isEditingExistingDiet,
}: Props) {
  const formMethods = useDietForm(dietForm)
  const mealsFieldArrayRef = useRef<MealsFieldArray>()
  const { handleSubmit } = formMethods

  const onSubmit = handleSubmit((form: DietForm) => {
    console.log('submit', form)
  })

  useLayoutEffect(() => {
    window.scroll({ top: scrollTop })
  }, [scrollTop])

  function onMealAdd() {
    mealsFieldArrayRef.current?.onMealAdd()
  }

  return (
    <FormProvider {...formMethods}>
      <Watcher />

      <IngredientsFormsDndProvider>
        <Flex
          justifyContent="center"
          bg="white"
          position="sticky"
          top="0"
          zIndex={1}
          pt={3}
        >
          <Box flex={1} maxWidth="900px">
            <NameAndStats
              isEditingExistingDiet={isEditingExistingDiet}
              onNewDiet={onNewDiet}
              onDietChange={onDietChange}
            />
            <Controls onMealAdd={onMealAdd} onSave={onSubmit} />
            <Divider mt={3} />
          </Box>
        </Flex>

        <Flex justifyContent="center">
          <Box flex={1} pt={3} maxWidth="900px">
            <MealsList mealsFieldArrayRef={mealsFieldArrayRef} />
          </Box>
        </Flex>
      </IngredientsFormsDndProvider>
    </FormProvider>
  )
}

export default Form
