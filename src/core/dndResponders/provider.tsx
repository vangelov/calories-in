import {
  ReactNode,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from 'react'
import {
  DragDropContext,
  DragStart,
  DropResult,
  OnDragEndResponder,
  OnDragStartResponder,
  ResponderProvided,
} from 'react-beautiful-dnd'

type Responder = OnDragEndResponder | OnDragStartResponder

type State = {
  responders: {
    onDragEnd: OnDragEndResponder[]
    onDragStart: OnDragStartResponder[]
  }
}

type Event = keyof State['responders']

const INITIAL_STATE: State = { responders: { onDragEnd: [], onDragStart: [] } }

type Action =
  | { type: 'pushResponder'; responder: Responder; event: Event }
  | { type: 'removeResponder'; responder: Responder; event: Event }
type Dispatch = (action: Action) => void

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

const StateContext = createContext<State | undefined>(undefined)
const DispatchContext = createContext<Dispatch | undefined>(undefined)

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

function useDragDropEventResponder(event: Event, responder: Responder) {
  const dispatch = useContext(DispatchContext)

  if (!dispatch) {
    throw new Error('Missing context provider in DragDropProvider')
  }

  useEffect(() => {
    dispatch({ type: 'pushResponder', responder, event })

    return () => {
      dispatch({ type: 'removeResponder', responder, event })
    }
  })
}

export { useDragDropEventResponder }

export default DragDropRespondersProvider
