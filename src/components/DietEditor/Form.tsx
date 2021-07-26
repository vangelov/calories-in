import { useDietForm, useDietFormActions, VariantForm } from 'core/diets'
import { FormChangesStoreProvider } from 'general/undoRedo'
import deepCopy from 'general/deepCopy'
import { useRef, useEffect, useState } from 'react'
import Page, { PageHeader, PageBody, PageFooter } from 'components/layout/Page'
import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import VariantsList from './VariantsList'

type Props = {
  isEditingExistingDiet: boolean
}

function Form({ isEditingExistingDiet }: Props) {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()
  const ref = useRef<Record<string, number | undefined>>({})
  const selectedVariantForm =
    dietForm.variantsForms[dietForm.selectedVariantFormIndex]

  const [t, setT] = useState(0)
  const [h, setH] = useState(0)

  function onUndoOrRedo(form: object, scrollTop: number, scrollLeft: number) {
    dietFormActions.setDietForm(deepCopy(form))
    setT(scrollTop)
    setH(scrollLeft)
  }

  function onVariantFormSelect(variantForm: VariantForm) {
    setT(ref.current[variantForm.fieldId] || 0)
  }

  useEffect(() => {
    function onScroll() {
      ref.current[selectedVariantForm.fieldId] = window.scrollY
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [selectedVariantForm.fieldId])

  useEffect(() => {
    window.scroll({ top: t })
  }, [t])

  useEffect(() => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.scrollLeft = h
    }
  }, [h])

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
            mealsForms={selectedVariantForm.mealsForms}
            selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
          />
        </PageBody>

        <PageFooter footerContainerRef={horizontalScrollRef}>
          <VariantsList onVariantFormSelect={onVariantFormSelect} />
        </PageFooter>
      </Page>
    </FormChangesStoreProvider>
  )
}

export default Form
