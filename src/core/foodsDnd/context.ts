import { MutableRefObject, createContext, useContext } from 'react'
import { IngredientForm } from 'core/dietForm'

type State = MutableRefObject<IngredientForm | undefined>

const StateContext = createContext<State | undefined>(undefined)

function useFoodsDragAndDropState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Provider missing')
  }

  return state
}

export { StateContext, useFoodsDragAndDropState }
