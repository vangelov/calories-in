import { useDietForm, useScrollManager } from 'diets'
import { DietFormVersionsStoreProvider } from 'undoRedo'
import { useRef } from 'react'
import { Page, PageHeader, PageBody, PageFooter } from 'layout'
import { MealsList } from 'meals'
import useDietFormEvents from './useDietFormEvents'
import { Box, useDisclosure } from '@chakra-ui/react'
import { useElementHeight } from 'general'
import Controls from './Controls'
import { SelectedVariantHeader } from 'variants'
import { FoodsDrawer } from 'foods'

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
  const dietFormEvents = useDietFormEvents({
    scrollManager,
    foodsDrawerDisclosure,
  })

  const {
    elementHeight: headerHeight,
    elementRef: headerRef,
  } = useElementHeight()

  return (
    <DietFormVersionsStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={dietFormEvents.onUndoOrRedo}
      onRedo={dietFormEvents.onUndoOrRedo}
    >
      <Page>
        <PageHeader ref={headerRef}>
          <Box bg="white" borderTopWidth="8px" borderTopColor="teal.500" px={3}>
            <SelectedVariantHeader
              onAddMeal={foodsDrawerDisclosure.onOpen}
              scrollManager={scrollManager}
            />
          </Box>
        </PageHeader>

        <PageBody>
          <MealsList
            headerHeight={headerHeight}
            selectedVariantFormFieldId={selectedVariantForm.fieldId}
            mealsForms={selectedVariantForm.mealsForms}
            selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
            onAddMeal={foodsDrawerDisclosure.onOpen}
          />

          <FoodsDrawer
            isOpen={foodsDrawerDisclosure.isOpen}
            onClose={foodsDrawerDisclosure.onClose}
            mealName={`Meal ${selectedVariantForm.mealsForms.length + 1}`}
            onSelectedFoods={dietFormEvents.onMealAdded}
          />
        </PageBody>

        <PageFooter>
          <Controls />
        </PageFooter>
      </Page>
    </DietFormVersionsStoreProvider>
  )
}

export default Form
