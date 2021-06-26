import { ReactNode, useReducer } from 'react'
import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'
import { State, Action, StateContext, DispatchContext } from './context'

const INITIAL_STATE: State = { responders: { onDragEnd: [], onDragStart: [] } }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'pushResponder':
      return {
        ...state,
        responders: {
          ...state.responders,
          [action.event]: [...state.responders[action.event], action.responder],
        },
      }
    case 'removeResponder':
      return {
        ...state,
        responders: {
          ...state.responders,
          [action.event]: state.responders[action.event].filter(
            responder => responder !== action.responder
          ),
        },
      }
  }
}

type Props = {
  children: ReactNode
}

function DragDropRespondersProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const onDragEnd = (dropResult: DropResult, provided: ResponderProvided) => {
    const responders = state.responders.onDragEnd
    responders.forEach(responder => responder(dropResult, provided))
  }

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    const responders = state.responders.onDragStart
    responders.forEach(responder => responder(initial, provided))
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          {children}
        </DragDropContext>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export * from './context'

export default DragDropRespondersProvider
