import { useDisclosure } from '@chakra-ui/hooks'
import {
  IngredientsFieldArray,
  MealsFieldArray,
  useAddIngredientsForms,
} from 'core/diets'
import { Food } from 'core/types'
import { useRef, useState } from 'react'

type Params = {
  index: number
  variantIndex: number
  ingredientsFieldArray: IngredientsFieldArray
  mealsFieldArray: MealsFieldArray
}

function useAddIngredients({
  index,
  variantIndex,
  ingredientsFieldArray,
  mealsFieldArray,
}: Params) {
  const [selectedMealName, setSelectedMealName] = useState('')
  const drawerDisclosure = useDisclosure()
  const onDrawеrSaveRef = useRef<(foods: Food[]) => void>(() => {})
  const addIngredientsForms = useAddIngredientsForms({ ingredientsFieldArray })

  function onAdd() {
    const selectedMealForm = mealsFieldArray.getMealFormAt(variantIndex, index)
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
