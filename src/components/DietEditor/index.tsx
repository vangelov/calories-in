import { Diet } from 'core/types'
import { getDietForm } from 'core/dietForm'
import { useRef, useState } from 'react'
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
        { amountInGrams: 1, foodId: 441 },
        { amountInGrams: 2, foodId: 442 },
        { amountInGrams: 3, foodId: 442 },
      ],
    },
    { name: 'Meal 2', ingredients: [{ amountInGrams: 600, foodId: 443 }] },
    { name: 'Meal 3', ingredients: [{ amountInGrams: 500, foodId: 443 }] },
  ],
  foodsByIdMap: {
    '441': { id: 441, name: 'Food1', categoryId: 7 },
    '442': { id: 442, name: 'Food2', categoryId: 7 },
    '443': { id: 443, name: 'Food3', categoryId: 7 },
  },
}

function DietEditor() {
  const [diet, setDiet] = useState(initialDiet)
  const [dietForm, setDietForm] = useState(() => getDietForm(diet))
  const ref = useRef<HTMLDivElement>(null)

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
        <UndoRedoMethodsProvider scrollRef={ref} dietForm={dietForm}>
          {(currentDietForm, version, scrollTop) => (
            <Form
              scrollRef={ref}
              key={version}
              onDietChange={onDietChange}
              onNewDiet={onNewDiet}
              dietForm={currentDietForm}
              scrollTop={scrollTop}
            />
          )}
        </UndoRedoMethodsProvider>
      </FoodsByIdProvider>
    </UndoRedoStateProvider>
  )
}

export default DietEditor
