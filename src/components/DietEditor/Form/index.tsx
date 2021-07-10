import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import { RefObject, useLayoutEffect } from 'react'
import { useFormChangesStoreState, Watcher } from 'general/undoRedo'
import VariantsList from './VariantsList'
import Page, { PageHeader, PageBody, PageFooter } from 'components/layout/Page'
import {
  VariantsFormsStoreProvider,
  MealsFormsStoreProvider,
  DietFormProvider,
} from 'core/diets'

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

  useLayoutEffect(() => {
    window.scroll({ top: versionScrollTop })
  }, [versionScrollTop])

  console.log('XXX')

  return (
    <DietFormProvider dietForm={form}>
      <Watcher />

      <VariantsFormsStoreProvider>
        {key => (
          <Page>
            <MealsFormsStoreProvider key={key}>
              <PageHeader>
                <>
                  <NameAndStats isEditingExistingDiet={isEditingExistingDiet} />
                  <Controls />
                </>
              </PageHeader>

              <PageBody>
                <MealsList />
              </PageBody>
            </MealsFormsStoreProvider>

            <PageFooter
              footerContainerScrollLeft={versionScrollLeft}
              footerContainerRef={horizontalScrollRef}
            >
              <VariantsList />
            </PageFooter>
          </Page>
        )}
      </VariantsFormsStoreProvider>
    </DietFormProvider>
  )
}

export default Form
