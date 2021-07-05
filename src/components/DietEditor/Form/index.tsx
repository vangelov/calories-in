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
import { RefObject, useLayoutEffect, useRef } from 'react'
import { useFormChangesStoreState, Watcher } from 'general/undoRedo'
import VariantsList from './VariantsList'
import Page from 'components/layout/Page'

type Props = {
  isEditingExistingDiet: boolean
  horizontalScrollRef: RefObject<HTMLDivElement>
}

function Form({ isEditingExistingDiet, horizontalScrollRef }: Props) {
  const {
    form,
    versionScrollLeft,
    versionScrollTop,
  } = useFormChangesStoreState()
  const formMethods = useDietForm(form)
  const onAppendMealRef = useRef<() => void>()
  const { handleSubmit } = formMethods
  const variantsFieldArray = useVariantsFieldArray({ formMethods })
  const { selectedVariantFormIndex, selectedVariantField } = variantsFieldArray

  useLayoutEffect(() => {
    window.scroll({ top: versionScrollTop })
  }, [versionScrollTop])

  function onMealAdd() {
    onAppendMealRef.current && onAppendMealRef.current()
  }

  console.log('XXX')

  const onSubmit = handleSubmit((form: DietForm) => {
    console.log('submit', form)
  })

  return (
    <FormProvider {...formMethods}>
      <Watcher />

      <IngredientsFormsDndProvider>
        <Page
          footerContainerScrollLeft={versionScrollLeft}
          footerContainerRef={horizontalScrollRef}
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
