import { Diet } from 'core/types'
import { getDietForm } from 'core/dietForm'
import { useState } from 'react'
import { UndoRedoMethodsProvider, UndoRedoStateProvider } from 'core/undoRedo'
import Form from './Form'

const initialDiet: Diet = {
  id: 1,
  name: 'First diet',
  meals: [
    {
      name: 'Meal 1',
      ingredients: [
        { amountInGrams: 1, foodId: 2 },
        { amountInGrams: 2, foodId: 2 },
        { amountInGrams: 3, foodId: 2 },
      ],
    },
    { name: 'Meal 2', ingredients: [{ amountInGrams: 600, foodId: 2 }] },
    { name: 'Meal 3', ingredients: [{ amountInGrams: 500, foodId: 2 }] },
  ],
}

function DietEditor() {
  const [dietForm, setDietForm] = useState(() => getDietForm(initialDiet))

  function onDietChange(diet: Diet) {
    const dietFrom = getDietForm(diet)
    setDietForm(dietFrom)
  }

  function onNewDiet() {
    setDietForm(getDietForm())
  }

  return (
    <UndoRedoStateProvider key={dietForm.formId}>
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
    </UndoRedoStateProvider>
  )
}

export default DietEditor
