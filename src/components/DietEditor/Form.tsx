import { useDietForm, useDietFormActions, VariantForm } from 'core/diets'
import { FormChangesStoreProvider } from 'general/undoRedo'
import deepCopy from 'general/deepCopy'
import { useRef, useCallback } from 'react'
import Page, { PageHeader, PageBody, PageFooter } from 'components/layout/Page'
import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import VariantsList from './VariantsList'
import useScrollState from './useScrollState'

type Props = {
  isEditingExistingDiet: boolean
}

function Form({ isEditingExistingDiet }: Props) {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()
  const selectedVariantForm =
    dietForm.variantsForms[dietForm.selectedVariantFormIndex]
  const { setScrollState, getCachedScrollTop } = useScrollState({
    selectedVariantForm,
    horizontalScrollRef,
  })

  function onUndoOrRedo(form: object, scrollTop: number, scrollLeft: number) {
    dietFormActions.setDietForm(deepCopy(form))
    setScrollState({ top: scrollTop, left: scrollLeft })
  }

  const onVariantFormSelect = useCallback(
    (variantForm: VariantForm) => {
      setScrollState({ top: getCachedScrollTop(variantForm.fieldId) })
    },
    [setScrollState, getCachedScrollTop]
  )

  const onVariantFormCopy = useCallback(() => {
    setScrollState({ top: 0 })
  }, [setScrollState])

  return (
    <FormChangesStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={onUndoOrRedo}
      onRedo={onUndoOrRedo}
    >
      <Page>
        <PageHeader>
          <>
            <NameAndStats
              selectedVariantForm={selectedVariantForm}
              isEditingExistingDiet={isEditingExistingDiet}
            />
            <Controls />
          </>
        </PageHeader>

        <PageBody>
          <MealsList
            selectedVariantFormFieldId={selectedVariantForm.fieldId}
            mealsForms={selectedVariantForm.mealsForms}
            selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
          />
        </PageBody>

        <PageFooter footerContainerRef={horizontalScrollRef}>
          <VariantsList
            onVariantFormCopy={onVariantFormCopy}
            onVariantFormSelect={onVariantFormSelect}
          />
        </PageFooter>
      </Page>
    </FormChangesStoreProvider>
  )
}

export default Form
