import { MutableRefObject, createContext, useContext } from 'react'
import { IngredientForm } from '../../../ingredients/ingredientForm'

type State = MutableRefObject<IngredientForm | undefined>

const StateContext = createContext<State | undefined>(undefined)

function useIngredientsFormsDndState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Provider missing')
  }

  return state
}

export { StateContext, useIngredientsFormsDndState }
