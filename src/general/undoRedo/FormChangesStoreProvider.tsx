import { DietForm } from 'core/diets'
import makeUseContext from 'general/makeUseContext'
import React, { createContext, ReactNode, RefObject, Fragment } from 'react'
import useFormChangesStore, { FormChangesStore } from './useFormChangesStore'
import useKeyboard from './useKeyboard'

const StateContext = createContext<FormChangesStore[0] | undefined>(undefined)
const MethodsContext = createContext<FormChangesStore[1] | undefined>(undefined)
const useFormChangesStoreState = makeUseContext(StateContext)
const useFormChangesStoreMethods = makeUseContext(MethodsContext)

type Props = {
  dietForm: DietForm
  horizontalScrollRef: RefObject<HTMLDivElement>
  children: ReactNode
}

function FormChangesStoreProvider({
  children,
  dietForm,
  horizontalScrollRef,
}: Props) {
  const [state, methods] = useFormChangesStore({
    dietForm,
    horizontalScrollRef,
  })

  const { undo, redo } = methods

  useKeyboard({ undo, redo })

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>
        <Fragment key={state.version}>{children}</Fragment>
      </StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useFormChangesStoreMethods, useFormChangesStoreState }

export default FormChangesStoreProvider
