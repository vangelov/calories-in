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
  useDietForm,
} from 'core/diets'

type Props = {
  isEditingExistingDiet: boolean
  horizontalScrollRef: RefObject<HTMLDivElement>
}

function Form({ isEditingExistingDiet, horizontalScrollRef }: Props) {
  const { versionScrollLeft, versionScrollTop } = useFormChangesStoreState()

  useLayoutEffect(() => {
    window.scroll({ top: versionScrollTop })
  }, [versionScrollTop])

  return (
    <Page>
      <PageHeader>
        <>
          <NameAndStats isEditingExistingDiet={isEditingExistingDiet} />
          <Controls />
        </>
      </PageHeader>

      <PageBody>
        <MealsList />
      </PageBody>

      <PageFooter
        footerContainerScrollLeft={versionScrollLeft}
        footerContainerRef={horizontalScrollRef}
      >
        <VariantsList />
      </PageFooter>
    </Page>
  )
}

export default Form
