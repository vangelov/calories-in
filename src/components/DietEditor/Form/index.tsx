import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import { DietForm, useDietForm, MealsFieldArray } from 'core/dietForm'
import { FormProvider } from 'react-hook-form'
import { useLayoutEffect, useRef } from 'react'
import { IngredientsFormsDndProvider } from 'core/ingredientsDnd'
import { Watcher } from 'core/undoRedo'
import VariantsList from './VariantsList'
import { Page } from 'components/general'
import useVariantsFieldArray from 'core/dietForm/useVariantsFieldArray'

type Props = {
  dietForm: DietForm
  scrollTop: number
  isEditingExistingDiet: boolean
}

function Form({ dietForm, scrollTop, isEditingExistingDiet }: Props) {
  const formMethods = useDietForm(dietForm)
  const mealsFieldArrayRef = useRef<MealsFieldArray>()
  const { handleSubmit } = formMethods
  const variantsFieldArray = useVariantsFieldArray({ formMethods })
  const { selectedVariantFormIndex, selectedVariantField } = variantsFieldArray

  useLayoutEffect(() => {
    window.scroll({ top: scrollTop })
  }, [scrollTop])

  function onMealAdd() {
    mealsFieldArrayRef.current?.onMealAdd()
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
              mealsFieldArrayRef={mealsFieldArrayRef}
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
