import { useDietForm, useScrollManager } from 'diets'
import { DietFormVersionsStoreProvider } from 'undoRedo'
import { useRef } from 'react'
import { Page, PageHeader, PageBody } from 'layout'
import { MealsDrawer, MealsList } from 'meals'
import useDietFormEvents from './useDietFormEvents'
import { Box, useDisclosure, Flex } from '@chakra-ui/react'
import { ScreenSize, useElementHeight, useScreenSize } from 'general'
import Controls from './Controls'
import { FoodsDrawer } from 'foods'
import { VariantsList, VariantStats } from 'variants'
import useVariantFormEvents from './useVariantFormActions'

function Form() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const selectedVariantForm = variantsForms[dietForm.selectedVariantFormIndex]

  const scrollManager = useScrollManager({
    selectedVariantForm,
    horizontalScrollRef,
  })

  const foodsDrawerDisclosure = useDisclosure()
  const mealsDrawerDisclosure = useDisclosure()
  const dietFormEvents = useDietFormEvents({
    scrollManager,
    foodsDrawerDisclosure,
  })

  const {
    elementHeight: headerHeight,
    elementRef: headerRef,
  } = useElementHeight()
  const variantFormEvents = useVariantFormEvents({ scrollManager })

  const screenSize = useScreenSize()

  return (
    <DietFormVersionsStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={dietFormEvents.onUndoOrRedo}
      onRedo={dietFormEvents.onUndoOrRedo}
    >
      <Page>
        <PageHeader ref={headerRef}>
          <Box bg="white" py={3}>
            <Controls />
          </Box>
        </PageHeader>

        <PageBody>
          <VariantsList
            onVariantFormCopy={variantFormEvents.onVariantFormCopy}
            onVariantFormSelect={variantFormEvents.onVariantFormSelect}
            ref={horizontalScrollRef}
          />

          <Flex justifyContent="space-between">
            <MealsList
              flex={1}
              headerHeight={headerHeight}
              selectedVariantFormFieldId={selectedVariantForm.fieldId}
              mealsForms={selectedVariantForm.mealsForms}
              selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
              onAddMeal={mealsDrawerDisclosure.onOpen}
            />

            {screenSize >= ScreenSize.Large && (
              <VariantStats
                position="sticky"
                top={`${headerHeight + 24}px`}
                ml={6}
                width="300px"
                bg="white"
                borderRadius={6}
                boxShadow="base"
              />
            )}
          </Flex>

          <FoodsDrawer
            isOpen={foodsDrawerDisclosure.isOpen}
            onClose={foodsDrawerDisclosure.onClose}
            mealName={`Meal ${selectedVariantForm.mealsForms.length + 1}`}
            onSelectedFoods={dietFormEvents.onMealAdded}
          />

          <MealsDrawer
            isOpen={mealsDrawerDisclosure.isOpen}
            onClose={mealsDrawerDisclosure.onClose}
            onSelectMeal={() => {}}
          />
        </PageBody>
      </Page>
    </DietFormVersionsStoreProvider>
  )
}

export default Form
