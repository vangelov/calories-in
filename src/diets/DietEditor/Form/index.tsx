import { useDietForm } from 'diets'
import { DietFormVersionsStoreProvider } from 'undoRedo'
import { useRef } from 'react'
import { Page, PageHeader, PageBody, PageFooter } from 'layout'
import { MealsList } from 'meals'
import useScrollManager from './useScrollManager'
import { useSaveValue } from 'persistence'
import useDietFormEvents from './useDietFormEvents'
import { Box } from '@chakra-ui/react'
import { useElementHeight } from 'general'
import Controls from './Controls'
import { VariantHeader } from 'variants'
import useVariantFormEvents from './useVariantFormEvents'

function Form() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const selectedVariantForm = variantsForms[dietForm.selectedVariantFormIndex]

  const scrollManager = useScrollManager({
    selectedVariantForm,
    horizontalScrollRef,
  })
  const dietFormEvents = useDietFormEvents({ scrollManager })
  const variantFormEvents = useVariantFormEvents({ scrollManager })

  const {
    elementHeight: headerHeight,
    elementRef: headerRef,
  } = useElementHeight()

  useSaveValue({ value: dietForm, key: 'lastDietForm' })

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
            <VariantHeader
              selectedVariantForm={selectedVariantForm}
              onVariantFormSelect={variantFormEvents.onVariantFormSelect}
            />
          </Box>
        </PageHeader>

        <PageBody>
          <MealsList
            headerHeight={headerHeight}
            selectedVariantFormFieldId={selectedVariantForm.fieldId}
            mealsForms={selectedVariantForm.mealsForms}
            selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
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
