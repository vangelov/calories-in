import { useFormChangesStoreMethods } from 'general/undoRedo'
import { MealsFieldArray } from '../useMealsFieldArray'

type Params = {
  mealsFieldArray: MealsFieldArray
}

function useRemoveMealForm({ mealsFieldArray }: Params) {
  const { saveLastChange } = useFormChangesStoreMethods()

  function onRemove(index: number) {
    mealsFieldArray.removeMealForm(index)
    saveLastChange()
  }

  return {
    onRemove,
  }
}

export default useRemoveMealForm
