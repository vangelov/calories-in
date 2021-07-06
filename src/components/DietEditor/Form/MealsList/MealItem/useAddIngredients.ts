import { useDisclosure } from '@chakra-ui/hooks'
import {
  IngredientsFieldArray,
  MealForm,
  useAddIngredientsForms,
} from 'core/diets'
import {
  useMealsFormsStoreMethods,
  useMealsFormsStoreState,
} from 'core/diets/meals/MealsFormsStoreProvider'
import { Food } from 'core/types'
import { useRef, useState } from 'react'

type Params = {
  index: number
  variantIndex: number
  ingredientsFieldArray: IngredientsFieldArray
}

function useAddIngredients({
  index,
  variantIndex,
  ingredientsFieldArray,
}: Params) {
  const [selectedMealName, setSelectedMealName] = useState('')
  const drawerDisclosure = useDisclosure()
  const onDrawеrSaveRef = useRef<(foods: Food[]) => void>(() => {})
  const addIngredientsForms = useAddIngredientsForms({ ingredientsFieldArray })

  const { getLatestMealFormAt } = useMealsFormsStoreMethods()

  function onAdd() {
    const selectedMealForm = getLatestMealFormAt(variantIndex, index)
    setSelectedMealName(selectedMealForm.name)

    drawerDisclosure.onOpen()

    onDrawеrSaveRef.current = (foods: Food[]) => {
      drawerDisclosure.onClose()
      addIngredientsForms.onAdd(foods)
    }
  }

  return {
    onAdd,
    selectFoodsDrawerProps: {
      mealName: selectedMealName,
      onSave: onDrawеrSaveRef.current,
      isOpen: drawerDisclosure.isOpen,
      onClose: drawerDisclosure.onClose,
    },
  }
}

export default useAddIngredients
