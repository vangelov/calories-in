import { Food } from 'core/types'
import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useFoodsStore, { FoodsStore } from './useFoodsStore'

const StateContext = createContext<FoodsStore[0] | undefined>(undefined)
const MethodsContext = createContext<FoodsStore[1] | undefined>(undefined)
const useFoodsStoreState = makeUseContext(StateContext)
const useFoodsStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
  initialFoods: Food[]
}

function FoodsStoreProvider({ children, initialFoods }: Props) {
  const [state, methods] = useFoodsStore({ initialFoods })

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useFoodsStoreState, useFoodsStoreMethods }

export default FoodsStoreProvider
