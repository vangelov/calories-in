import makeUseContext from 'general/makeUseContext'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { createContext, ReactNode, useCallback, useRef } from 'react'
import {
  getInsertIngredientFormAnimationKey,
  IngredientForm,
} from './ingredientForm'
import useIngredientsFormStore, {
  IngredientsFormsStore,
} from './useIngredientsFormsStore'
import { useDndResponder } from 'general/dndResponders'
import { DragStart, DropResult } from 'react-beautiful-dnd'
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

  const onBeforeAddIngredientsForms = useCallback(
    (ingredientsForms: IngredientForm[]) => {
      ingredientsForms.forEach(({ fieldId }) => {
        oneTimeCheckStoreMethods.set(
          getInsertIngredientFormAnimationKey(fieldId)
        )
      })
    },
    [oneTimeCheckStoreMethods]
  )

  const onAfterChange = useCallback(() => {
    formChangesStoreMethods.saveLastChange()
  }, [formChangesStoreMethods])

  const [state, methods] = useIngredientsFormStore({
    variantIndex,
    mealIndex,
    onBeforeAddIngredientsForms,
    onAfterChange,
  })

  useDndResponder('onDragStart', (initial: DragStart) => {
    const { source, type } = initial

    if (type === 'ingredientsList') {
      methods.saveIngredientFormForDrag(source.droppableId, source.index)
    }
  })

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (destination && type === 'ingredientsList') {
      methods.reorderIngredientsForms(source, destination, mealField)
    }
  })

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useIngredientsFormsStoreState, useIngredientsFormsStoreMethods }

export default IngredientsFormsStoreProvider
