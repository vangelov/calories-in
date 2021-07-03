import { DietForm } from 'core/diets'
import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode, RefObject } from 'react'
import useFormChangesStore, { FormChangesStore } from './useFormChangesStore'

const StateContext = createContext<FormChangesStore[0] | undefined>(undefined)
const MethodsContext = createContext<FormChangesStore[1] | undefined>(undefined)
const useFormChangesStoreState = makeUseContext(StateContext)
const useFormChangesStoreMethods = makeUseContext(MethodsContext)

type Props = {
  dietForm: DietForm
  horizontalScrollRef: RefObject<HTMLDivElement>
  children: (
    currentDietForm: DietForm,
    version: string,
    scrollTop: number,
    scrollLeft: number
  ) => ReactNode
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

  const { form, version, versionScrollLeft, versionScrollTop } = state

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>
        {children(form, version, versionScrollLeft, versionScrollTop)}
      </StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useFormChangesStoreMethods, useFormChangesStoreState }

export default FormChangesStoreProvider
