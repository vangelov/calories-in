import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import { RefObject, useLayoutEffect } from 'react'
import { useFormChangesStoreState } from 'general/undoRedo'
import VariantsList from './VariantsList'
import Page, { PageHeader, PageBody, PageFooter } from 'components/layout/Page'
import { useDietForm } from 'core/diets'

type Props = {
  isEditingExistingDiet: boolean
  horizontalScrollRef: RefObject<HTMLDivElement>
}

function Form({ isEditingExistingDiet, horizontalScrollRef }: Props) {
  const { versionScrollLeft, versionScrollTop } = useFormChangesStoreState()

  useLayoutEffect(() => {
    window.scroll({ top: versionScrollTop })
  }, [versionScrollTop])

  const dietForm = useDietForm()
  const { selectedVariantFormIndex } = dietForm
  const { mealsForms } = dietForm.variantsForms[
    dietForm.selectedVariantFormIndex
  ]

  return (
    <Page>
      <PageHeader>
        <>
          <NameAndStats isEditingExistingDiet={isEditingExistingDiet} />
          <Controls />
        </>
      </PageHeader>

      <PageBody>
        <MealsList
          mealsForms={mealsForms}
          selectedVariantFormIndex={selectedVariantFormIndex}
        />
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
