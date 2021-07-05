import makeUseContext from 'general/makeUseContext'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { createContext, ReactNode, useCallback } from 'react'
import {
  getInsertIngredientFormAnimationKey,
  IngredientForm,
} from './ingredientForm'
import useIngredientsFormStore, {
  IngredientsFormsStore,
} from './useIngredientsFormsStore'
import { useDndResponder } from 'general/dndResponders'
import { DropResult } from 'react-beautiful-dnd'
import { useIngredientsFormsDndState } from './actions/IngredientsFormsDndProvider'
import { MealField } from '../meals'

const StateContext = createContext<IngredientsFormsStore[0] | undefined>(
  undefined
)
const MethodsContext = createContext<IngredientsFormsStore[1] | undefined>(
  undefined
)
const useIngredientsFormsStoreState = makeUseContext(StateContext)
const useIngredientsFormsStoreMethods = makeUseContext(MethodsContext)

type Props = {
  variantIndex: number
  mealIndex: number
  children: ReactNode
  mealField: MealField
}

function IngredientsFormsStoreProvider({
  children,
  variantIndex,
  mealIndex,
  mealField,
}: Props) {
  const oneTimeCheckStoreMethods = useOneTimeCheckStoreMethods()
  const formChangesStoreMethods = useFormChangesStoreMethods()
  const ingredientFormRef = useIngredientsFormsDndState()

  const onIngredientsFormsAdded = useCallback(
    (ingredientsForms: IngredientForm[]) => {
      ingredientsForms.forEach(({ fieldId }) => {
        oneTimeCheckStoreMethods.set(
          getInsertIngredientFormAnimationKey(fieldId)
        )
      })
    },
    [oneTimeCheckStoreMethods]
  )

  const onChange = useCallback(() => {
    formChangesStoreMethods.saveLastChange()
  }, [formChangesStoreMethods])

  const [state, methods] = useIngredientsFormStore({
    variantIndex,
    mealIndex,
    onIngredientsFormsAdded,
    onChange,
  })

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'ingredientsList') {
      return
    }

    methods.reorderIngredientsForms(
      source,
      destination,
      mealField,
      ingredientFormRef.current
    )
  })

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useIngredientsFormsStoreState, useIngredientsFormsStoreMethods }

export default IngredientsFormsStoreProvider
