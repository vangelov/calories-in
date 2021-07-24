import { DietForm } from 'core/diets'
import { useDietForm, useDietFormActions } from 'core/diets'
import deepCopy from 'general/deepCopy'
import makeUseContext from 'general/makeUseContext'
import React, {
  createContext,
  ReactNode,
  RefObject,
  useEffect,
  useCallback,
} from 'react'
import useFormChangesStore, { FormChangesStore } from './useFormChangesStore'
import useKeyboard from './useKeyboard'

const StateContext = createContext<FormChangesStore[0] | undefined>(undefined)
const MethodsContext = createContext<FormChangesStore[1] | undefined>(undefined)
const useFormChangesStoreState = makeUseContext(StateContext)
const useFormChangesStoreMethods = makeUseContext(MethodsContext)

type Props = {
  initialDietForm: DietForm
  horizontalScrollRef: RefObject<HTMLDivElement>
  children: ReactNode
}

function FormChangesStoreProvider({
  children,
  initialDietForm,
  horizontalScrollRef,
}: Props) {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()

  const onUndoOrRedo = useCallback(
    (form: DietForm) => {
      dietFormActions.setDietForm(deepCopy(form))
    },
    [dietFormActions]
  )

  const [state, methods] = useFormChangesStore({
    dietForm: initialDietForm,
    horizontalScrollRef,
    onUndo: onUndoOrRedo,
    onRedo: onUndoOrRedo,
  })

  useEffect(() => {
    methods.pushForm(dietForm)
  }, [dietForm, methods])

  const { undo, redo } = methods

  useKeyboard({ undo, redo })

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useFormChangesStoreMethods, useFormChangesStoreState }

export default FormChangesStoreProvider
