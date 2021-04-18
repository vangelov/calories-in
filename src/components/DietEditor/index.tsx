import { Diet } from 'core/types'
import { getDietForm } from 'core/dietForm'
import { useState } from 'react'
import { UndoRedoMethodsProvider, UndoRedoStateProvider } from 'core/undoRedo'
import Form from './Form'
import { FoodsByIdProvider } from 'core/foods'

const initialDiet: Diet = {
  id: 1,
  name: 'First diet',
  meals: [
    {
      name: 'Meal 1',
      ingredients: [
        { amountInGrams: 1, foodId: 1 },
        { amountInGrams: 2, foodId: 2 },
        { amountInGrams: 3, foodId: 2 },
      ],
    },
    { name: 'Meal 2', ingredients: [{ amountInGrams: 600, foodId: 3 }] },
    { name: 'Meal 3', ingredients: [{ amountInGrams: 500, foodId: 3 }] },
  ],
  foodsByIdMap: {
    '1': { id: 1, name: 'Food1', categoryId: 7 },
    '2': { id: 2, name: 'Food2', categoryId: 7 },
    '3': { id: 3, name: 'Food3', categoryId: 7 },
  },
}

function DietEditor() {
  const [diet, setDiet] = useState(initialDiet)
  const [dietForm, setDietForm] = useState(() => getDietForm(diet))

  function onDietChange(diet: Diet) {
    const dietFrom = getDietForm(diet)
    setDietForm(dietFrom)
    setDiet(diet)
  }

  function onNewDiet() {
    setDietForm(getDietForm())
  }

  return (
    <UndoRedoStateProvider key={dietForm.formId}>
      <FoodsByIdProvider initialFoodsByIdMap={diet.foodsByIdMap}>
        <UndoRedoMethodsProvider dietForm={dietForm}>
          {(currentDietForm, version) => (
            <Form
              key={version}
              onDietChange={onDietChange}
              onNewDiet={onNewDiet}
              dietForm={currentDietForm}
            />
          )}
        </UndoRedoMethodsProvider>
      </FoodsByIdProvider>
    </UndoRedoStateProvider>
  )
}

export default DietEditor
