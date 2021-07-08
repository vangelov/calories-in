import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import { DietForm, useDietForm } from 'core/diets'
import { FormProvider } from 'react-hook-form'
import { RefObject, useLayoutEffect, useRef } from 'react'
import { useFormChangesStoreState, Watcher } from 'general/undoRedo'
import VariantsList from './VariantsList'
import Page from 'components/layout/Page'
import { VariantsFormsStoreProvider, MealsFormsStoreProvider } from 'core/diets'

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

      <VariantsFormsStoreProvider>
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
            <MealsFormsStoreProvider>
              <MealsList onAppendMealRef={onAppendMealRef} />
            </MealsFormsStoreProvider>
          }
          footerElement={<VariantsList />}
        />
      </VariantsFormsStoreProvider>
    </FormProvider>
  )
}

export default Form
