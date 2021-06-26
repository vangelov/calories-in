import { useDisclosure } from '@chakra-ui/hooks'
import {
  DietForm,
  IngredientsFieldArray,
  useAddIngredientsForms,
} from 'core/diets'
import { Food } from 'core/types'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

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
  const { getValues } = useFormContext<DietForm>()
  const [selectedMealName, setSelectedMealName] = useState('')
  const drawerDisclosure = useDisclosure()
  const onDrawеrSaveRef = useRef<(foods: Food[]) => void>(() => {})
  const addIngredientsForms = useAddIngredientsForms({ ingredientsFieldArray })

  function findSelectedMealName() {
    const dietForm = getValues()
    const { variantsForms } = dietForm
    const mealForm = variantsForms[variantIndex].mealsForms[index]

    return mealForm.name
  }

  function onAdd() {
    setSelectedMealName(findSelectedMealName())
    drawerDisclosure.onOpen()

    onDrawеrSaveRef.current = (foods: Food[]) => {
      drawerDisclosure.onClose()
      addIngredientsForms.onAdd(foods)
    }
  }

  return {
    onAdd,
    selectedMealName: selectedMealName,
    onDrawerSave: onDrawеrSaveRef.current,
    isDrawerOpen: drawerDisclosure.isOpen,
    onDrawerClose: drawerDisclosure.onClose,
  }
}

export default useAddIngredients
