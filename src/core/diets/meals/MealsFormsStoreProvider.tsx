import makeUseContext from 'general/makeUseContext'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { createContext, ReactNode, useCallback } from 'react'
import { getInsertMealFormAnimationKey, MealForm } from './mealForm'
import useMealsFormsStore, { MealsFormsStore } from './useMealsFormsStore'
import { useDndResponder } from 'general/dndResponders'
import { DropResult } from 'react-beautiful-dnd'
import { useVariantsFormsStoreState } from '../variants/VariantsFormsStoreProvider'

const StateContext = createContext<MealsFormsStore[0] | undefined>(undefined)
const MethodsContext = createContext<MealsFormsStore[1] | undefined>(undefined)
const useMealsFormsStoreState = makeUseContext(StateContext)
const useMealsFormsStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function MealsFormsStoreProvider({ children }: Props) {
  const { selectedVariantFormIndex } = useVariantsFormsStoreState()
  const oneTimeCheckStoreMethods = useOneTimeCheckStoreMethods()
  const formChangesStoreMethods = useFormChangesStoreMethods()

  const onBeforeMealFormAppend = useCallback(
    (mealForm: MealForm) => {
      oneTimeCheckStoreMethods.set(
        getInsertMealFormAnimationKey(mealForm.fieldId)
      )
    },
    [oneTimeCheckStoreMethods]
  )

  const onAfterChange = useCallback(() => {
    formChangesStoreMethods.saveLastChange()
  }, [formChangesStoreMethods])

  const [state, methods] = useMealsFormsStore({
    variantIndex: selectedVariantFormIndex,
    onBeforeMealFormAppend,
    onAfterChange,
  })

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'mealsList') {
      return
    }

    methods.reorderMealsForms(source.index, destination.index)
  })

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useMealsFormsStoreState, useMealsFormsStoreMethods }

export default MealsFormsStoreProvider
