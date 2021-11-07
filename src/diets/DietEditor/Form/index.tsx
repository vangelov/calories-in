import { useDietForm } from 'diets'
import { DietFormVersionsStoreProvider } from 'undoRedo'
import { useRef } from 'react'
import { Page, PageHeader, PageBody, PageFooter } from 'layout'
import NameAndStats from './NameAndStats'
import { MealsList } from 'meals'
import Controls from './Controls'
import { VariantsList } from 'variants'
import useScrollManager from './useScrollManager'
import { useSaveValue } from 'persistence'
import useDietFormEvents from './useDietFormEvents'
import useVariantFormEvents from './useVariantFormActions'
import { Divider, Box } from '@chakra-ui/react'
import { ScreenSize, useElementHeight, useScreenSize } from 'general'
import { canExportDietForm } from 'diets/persistence'

function Form() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const selectedVariantForm = variantsForms[dietForm.selectedVariantFormIndex]
  const screenSize = useScreenSize()

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
        <PageHeader>
          <Box
            ref={headerRef}
            bg="white"
            borderTopWidth="8px"
            borderTopColor="teal.500"
            px={{ base: 0, lg: 3 }}
          >
            <NameAndStats
              selectedVariantForm={selectedVariantForm}
              canExport={canExportDietForm(dietForm)}
            />
            {screenSize <= ScreenSize.Small && <Divider />}
            {screenSize <= ScreenSize.Small && (
              <Controls canExport={canExportDietForm(dietForm)} />
            )}
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
          <VariantsList
            onVariantFormCopy={variantFormEvents.onVariantFormCopy}
            onVariantFormSelect={variantFormEvents.onVariantFormSelect}
            ref={horizontalScrollRef}
          />
        </PageFooter>
      </Page>
    </DietFormVersionsStoreProvider>
  )
}

export default Form
