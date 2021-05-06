import Header from './Header'
import MealsList, { MealsController } from './MealsList'
import { Box, Flex } from '@chakra-ui/react'
import Controls from './Controls'
import { Diet } from 'core/types'
import { DietForm, useDietForm } from 'core/dietForm'
import { FormProvider } from 'react-hook-form'
import { RefObject, useLayoutEffect, useRef } from 'react'
import {
  IngredientsFormsDndProvider,
  LastFieldIdProvider,
} from 'core/ingredientsDnd'
import { Watcher } from 'core/undoRedo'
import InvisibleScrollbar from 'components/general/InvisibleScrollbar'

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

      <IngredientsFormsDndProvider>
        <LastFieldIdProvider>
          <Flex
            py={4}
            width="100%"
            px={6}
            borderLeftWidth={1}
            borderBottomWidth={1}
            borderBottomColor="gray.200"
            bg="white"
          >
            <Box width="100%">
              <Header onNewDiet={onNewDiet} onDietChange={onDietChange} />
              <Controls onMealAdd={onMealAdd} onSave={onSubmit} />
            </Box>
            <InvisibleScrollbar />
          </Flex>

          <MealsList
            scrollRef={scrollRef}
            mealsControllerRef={mealsControllerRef}
          />
        </LastFieldIdProvider>
      </IngredientsFormsDndProvider>
    </FormProvider>
  )
}

export default Form
