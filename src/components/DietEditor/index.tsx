import { Diet } from 'core/types'
import { getDietForm } from 'core/dietForm'
import { useRef, useState } from 'react'
import { UndoRedoMethodsProvider, UndoRedoStateProvider } from 'core/undoRedo'
import Form from './Form'
import { FoodsByIdProvider } from 'core/foods'
import { DietStatsProvider, InitialEnergyProvider } from 'core/stats'

const initialDiet: Diet = {
  id: 1,
  name: 'First diet',
  meals: [
    {
      name: 'Meal 1',
      ingredients: [
        { amountInGrams: 1, foodId: 441 },
        { amountInGrams: 2, foodId: 442 },
        { amountInGrams: 3, foodId: 442 },
      ],
    },
    { name: 'Meal 2', ingredients: [{ amountInGrams: 600, foodId: 443 }] },
    { name: 'Meal 3', ingredients: [{ amountInGrams: 500, foodId: 443 }] },
  ],
  foodsByIdMap: {
    '441': { id: 441, name: 'Food1', categoryId: 3 },
    '442': { id: 442, name: 'Food2', categoryId: 3 },
    '443': { id: 443, name: 'Food3', categoryId: 3 },
  },
}

function DietEditor() {
  const [diet, setDiet] = useState<Diet | undefined>(initialDiet)
  const [dietForm, setDietForm] = useState(() => getDietForm(diet))
  const scrollRef = useRef<HTMLDivElement>(null)

  function onDietChange(diet: Diet) {
    const dietFrom = getDietForm(diet)
    setDietForm(dietFrom)
    setDiet(diet)
  }

  function onNewDiet() {
    setDiet(undefined)
    setDietForm(getDietForm())
  }

  return (
    <UndoRedoStateProvider key={dietForm.formId}>
      <InitialEnergyProvider>
        <DietStatsProvider>
          <FoodsByIdProvider initialFoodsByIdMap={diet && diet.foodsByIdMap}>
            <UndoRedoMethodsProvider scrollRef={scrollRef} dietForm={dietForm}>
              {(currentDietForm, version, scrollTop) => (
                <Form
                  isEditingExistingDiet={diet !== undefined}
                  scrollRef={scrollRef}
                  key={version}
                  onDietChange={onDietChange}
                  onNewDiet={onNewDiet}
                  dietForm={currentDietForm}
                  scrollTop={scrollTop}
                />
              )}
            </UndoRedoMethodsProvider>
          </FoodsByIdProvider>
        </DietStatsProvider>
      </InitialEnergyProvider>
    </UndoRedoStateProvider>
  )
}

export default DietEditor
