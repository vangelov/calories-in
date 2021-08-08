import { useDietForm } from 'core/diets'
import { FormVersionsStoreProvider } from 'general/formVersions'
import { useRef, useCallback } from 'react'
import Page, { PageHeader, PageBody, PageFooter } from 'components/layout/Page'
import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import VariantsList from './VariantsList'
import useScrollManager from './useScrollManager'
import { Delta } from 'jsondiffpatch'
import useActions from './useActions'

type Props = {
  isEditingExistingDiet: boolean
}

function Form({ isEditingExistingDiet }: Props) {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)

  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const selectedVariantForm = variantsForms[dietForm.selectedVariantFormIndex]

  const scrollManager = useScrollManager({
    selectedVariantForm,
    horizontalScrollRef,
  })
  const actions = useActions({ scrollManager })

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
      onUndo={actions.onUndoOrRedo}
      onRedo={actions.onUndoOrRedo}
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

        <PageFooter>
          <VariantsList
            onVariantFormCopy={actions.onVariantFormCopy}
            onVariantFormSelect={actions.onVariantFormSelect}
            ref={horizontalScrollRef}
          />
        </PageFooter>
      </Page>
    </FormVersionsStoreProvider>
  )
}

export default Form
