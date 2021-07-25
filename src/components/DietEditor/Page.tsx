import NameAndStats from './NameAndStats'
import MealsList from './MealsList'
import Controls from './Controls'
import { useLayoutEffect, useRef, useEffect } from 'react'
import { useFormChangesStoreState } from 'general/undoRedo'
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
  const state = useFormChangesStoreState()
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const ref = useRef<Record<number, number | undefined>>({})

  const dietForm = useDietForm()
  const { selectedVariantFormIndex } = dietForm
  const selectedVariantForm =
    dietForm.variantsForms[dietForm.selectedVariantFormIndex]

  useKeyboard()

  useEffect(() => {
    function onScroll() {
      ref.current[selectedVariantFormIndex] = window.scrollY
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [selectedVariantFormIndex])

  useEffect(() => {
    if (ref.current[selectedVariantFormIndex] !== undefined) {
      console.log(
        'set',
        ref.current[selectedVariantFormIndex],
        selectedVariantFormIndex
      )
      window.scroll({ top: ref.current[selectedVariantFormIndex] })
    }
  }, [selectedVariantFormIndex])

  useEffect(() => {
    console.log('set2', state.versionScrollTop)
    window.scroll({ top: state.versionScrollTop })
  }, [state.versionScrollTop])

  return (
    <PageBase>
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
          selectedVariantFormIndex={selectedVariantFormIndex}
        />
      </PageBody>

      <PageFooter
        footerContainerScrollLeft={state.versionScrollLeft}
        footerContainerRef={horizontalScrollRef}
      >
        <VariantsList />
      </PageFooter>
    </PageBase>
  )
}

export default Page
