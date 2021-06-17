import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import { Box, Divider, Flex, Text, HStack } from '@chakra-ui/react'
import Controls from './Controls'
import { DietForm, useDietForm, MealsFieldArray } from 'core/dietForm'
import { FormProvider } from 'react-hook-form'
import { useLayoutEffect, useRef } from 'react'
import { IngredientsFormsDndProvider } from 'core/ingredientsDnd'
import { Watcher } from 'core/undoRedo'

type Props = {
  dietForm: DietForm

  scrollTop: number
  isEditingExistingDiet: boolean
}

function Form({
  dietForm,

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
          position="sticky"
          top="0"
          zIndex={2}
          bg="white"
          pt={3}
        >
          <Box flex={1} maxWidth="900px">
            <NameAndStats isEditingExistingDiet={isEditingExistingDiet} />
            <Controls onMealAdd={onMealAdd} onSave={onSubmit} />
            <Divider mt={3} />
          </Box>
        </Flex>

        <Flex justifyContent="center">
          <Box flex={1} pt={3} maxWidth="900px">
            <MealsList mealsFieldArrayRef={mealsFieldArrayRef} />
          </Box>
        </Flex>

        <Flex
          justifyContent="center"
          bg="white"
          position="sticky"
          bottom="0"
          zIndex={2}
        >
          <Box flex={1} maxWidth="900px">
            <Divider />
            <Flex py={2} alignItems="center" justifyContent="space-between">
              <Text fontSize="sm" color="gray.500">
                3 meals
              </Text>

              <HStack spacing={4} justifyContent="space-between">
                <Text fontSize="sm" color="gray.500">
                  Sugar: 100
                  <Text as="span" fontSize="xs" color="gray.500">
                    g
                  </Text>
                </Text>

                <Text fontSize="sm" color="gray.500">
                  Fiber: 20g
                </Text>

                <Text fontSize="sm" color="gray.500">
                  Saturated fat: 10%
                </Text>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </IngredientsFormsDndProvider>
    </FormProvider>
  )
}

export default Form
