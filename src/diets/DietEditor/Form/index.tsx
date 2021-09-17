import { useDietForm } from 'diets'
import { FormVersionsStoreProvider } from 'general/formVersions'
import { useRef } from 'react'
import { Page, PageHeader, PageBody, PageFooter } from 'layout'
import NameAndStats from './NameAndStats'
import { MealsList } from 'meals'
import Controls from './Controls'
import { VariantsList } from 'variants'
import useScrollManager from './useScrollManager'
import useActions from './useActions'
import { useSaveValue } from 'persistence'

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

  useSaveValue({ value: dietForm, key: 'lastDietForm' })

  return (
    <FormVersionsStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={actions.onUndoOrRedo}
      onRedo={actions.onUndoOrRedo}
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
