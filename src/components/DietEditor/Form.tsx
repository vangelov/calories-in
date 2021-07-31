import {
  DietForm,
  useDietForm,
  useDietFormActions,
  VariantForm,
} from 'core/diets'
import { FormVersionsStoreProvider } from 'general/formVersions'
import { useRef, useCallback } from 'react'
import Page, { PageHeader, PageBody, PageFooter } from 'components/layout/Page'
import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import VariantsList from './VariantsList'
import useScrollState from './useScrollState'
import { Delta } from 'jsondiffpatch'

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
    dietFormActions.setDietForm(form as DietForm)
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

  const shouldSaveDelta = useCallback((delta: Delta) => {
    const onlySelectedFormIndexChanged =
      Object.keys(delta).length === 1 &&
      delta.selectedVariantFormIndex !== undefined

    return false === onlySelectedFormIndexChanged
  }, [])

  return (
    <FormVersionsStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={onUndoOrRedo}
      onRedo={onUndoOrRedo}
      shouldSaveDelta={shouldSaveDelta}
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
    </FormVersionsStoreProvider>
  )
}

export default Form
