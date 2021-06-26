import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import {
  DietForm,
  useDietForm,
  useVariantsFieldArray,
  IngredientsFormsDndProvider,
} from 'core/diets'
import { FormProvider } from 'react-hook-form'
import { useLayoutEffect, useRef } from 'react'
import { Watcher } from 'general/undoRedo'
import VariantsList from './VariantsList'
import { Page } from 'components/general'

type Props = {
  dietForm: DietForm
  scrollTop: number
  isEditingExistingDiet: boolean
}

function Form({ dietForm, scrollTop, isEditingExistingDiet }: Props) {
  const formMethods = useDietForm(dietForm)
  const onAppendMealRef = useRef<() => void>()
  const { handleSubmit } = formMethods
  const variantsFieldArray = useVariantsFieldArray({ formMethods })
  const { selectedVariantFormIndex, selectedVariantField } = variantsFieldArray

  useLayoutEffect(() => {
    window.scroll({ top: scrollTop })
  }, [scrollTop])

  function onMealAdd() {
    onAppendMealRef.current && onAppendMealRef.current()
  }

  const onSubmit = handleSubmit((form: DietForm) => {
    console.log('submit', form)
  })

  return (
    <FormProvider {...formMethods}>
      <Watcher />

      <IngredientsFormsDndProvider>
        <Page
          headerElement={
            <>
              <NameAndStats isEditingExistingDiet={isEditingExistingDiet} />
              <Controls onMealAdd={onMealAdd} onSave={onSubmit} />
            </>
          }
          bodyElement={
            <MealsList
              key={`${selectedVariantFormIndex}-${selectedVariantField.fieldId}`}
              variantField={selectedVariantField}
              onAppendMealRef={onAppendMealRef}
              variantIndex={selectedVariantFormIndex}
            />
          }
          footerElement={
            <VariantsList variantsFieldArray={variantsFieldArray} />
          }
        />
      </IngredientsFormsDndProvider>
    </FormProvider>
  )
}

export default Form
