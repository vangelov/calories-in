import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import { useLayoutEffect, useRef } from 'react'
import {
  useFormChangesStoreMethods,
  useFormChangesStoreState,
} from 'general/undoRedo'
import VariantsList from './VariantsList'
import PageBase, {
  PageHeader,
  PageBody,
  PageFooter,
} from 'components/layout/Page'
import { useDietForm } from 'core/diets'
import useKeyboard from './useKeyboard'

type Props = {
  isEditingExistingDiet: boolean
}

function Page({ isEditingExistingDiet }: Props) {
  const { versionScrollLeft, versionScrollTop } = useFormChangesStoreState()
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const formChangesActions = useFormChangesStoreMethods()

  useLayoutEffect(() => {
    window.scroll({ top: versionScrollTop })
  }, [versionScrollTop])

  const dietForm = useDietForm()
  const { selectedVariantFormIndex } = dietForm

  const { mealsForms } = dietForm.variantsForms[
    dietForm.selectedVariantFormIndex
  ]

  useKeyboard({ undo: formChangesActions.undo, redo: formChangesActions.redo })

  return (
    <PageBase>
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
    </PageBase>
  )
}

export default Page
