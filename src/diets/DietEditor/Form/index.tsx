import { useDietForm } from 'diets'
import { FormVersionsStoreProvider } from 'general/formVersions'
import { useRef, useState } from 'react'
import { Page, PageHeader, PageBody, PageFooter } from 'layout'
import NameAndStats from './NameAndStats'
import { MealsList } from 'meals'
import Controls from './Controls'
import { VariantsList } from 'variants'
import useScrollManager from './useScrollManager'
import useActions from './useActions'
import { useSaveValue } from 'persistence'
import { Food, FoodModal } from 'foods'
import { useDisclosure } from '@chakra-ui/hooks'

type Props = {
  isEditingExistingDiet: boolean
}

function Form({ isEditingExistingDiet }: Props) {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const selectedVariantForm = variantsForms[dietForm.selectedVariantFormIndex]

  const scrollManager = useScrollManager({
    selectedVariantForm,
    horizontalScrollRef,
  })
  const actions = useActions({ scrollManager })
  const foodModalDisclosure = useDisclosure()
  const [food, setFood] = useState<Food>()

  useSaveValue({ value: dietForm, key: 'lastDietForm' })

  function onViewFoodDetails(food: Food) {
    setFood(food)
    foodModalDisclosure.onOpen()
  }

  return (
    <FormVersionsStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={actions.onUndoOrRedo}
      onRedo={actions.onUndoOrRedo}
    >
      <Page>
        <FoodModal
          isOpen={foodModalDisclosure.isOpen}
          onClose={foodModalDisclosure.onClose}
          onFoodCreatedOrUpdated={() => {}}
          food={food}
        />
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
            selectedVariantFormFieldId={selectedVariantForm.fieldId}
            mealsForms={selectedVariantForm.mealsForms}
            selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
            onViewFoodDetails={onViewFoodDetails}
          />
        </PageBody>

        <PageFooter>
          <VariantsList
            onVariantFormCopy={actions.onVariantFormCopy}
            onVariantFormSelect={actions.onVariantFormSelect}
            ref={horizontalScrollRef}
          />
        </PageFooter>
      </Page>
    </FormVersionsStoreProvider>
  )
}

export default Form
