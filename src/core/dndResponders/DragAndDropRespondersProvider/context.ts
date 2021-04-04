import { OnDragEndResponder, OnDragStartResponder } from 'react-beautiful-dnd'
import { createContext, useContext } from 'react'

type Responder = OnDragEndResponder | OnDragStartResponder

type State = {
  responders: {
    onDragEnd: OnDragEndResponder[]
    onDragStart: OnDragStartResponder[]
  }
}

type Event = keyof State['responders']

type Action =
  | { type: 'pushResponder'; responder: Responder; event: Event }
  | { type: 'removeResponder'; responder: Responder; event: Event }

type Dispatch = (action: Action) => void

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

function useDragAndDropRespondersDispatch() {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing context provider in DragDropProvider')
  }

  return dispatch
}

function useDragAndDropRespondersState() {
  const state = useContext(StateContext)

  if (!state) {
    throw new Error('Missing context provider in DragDropProvider')
  }

  return state
}

export type { State, Action, Responder, Event }

export {
  StateContext,
  DispatchContext,
  useDragAndDropRespondersDispatch,
  useDragAndDropRespondersState,
}
