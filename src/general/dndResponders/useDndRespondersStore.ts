import tuple from 'general/tuple'
import { useCallback, useMemo, useState } from 'react'
import { OnDragEndResponder, OnDragStartResponder } from 'react-beautiful-dnd'

type Responder = OnDragEndResponder | OnDragStartResponder

type State = {
  onDragEnd: OnDragEndResponder[]
  onDragStart: OnDragStartResponder[]
}

type Event = keyof State

const INITIAL_STATE: State = { onDragEnd: [], onDragStart: [] }

function useDndRespondersStore() {
  const [state, setState] = useState(INITIAL_STATE)

  const pushResponder = useCallback((responder: Responder, event: Event) => {
    setState(state => {
      return {
        ...state,
        [event]: [...state[event], responder],
      }
    })
  }, [])

  const removeResponder = useCallback(
    (responderToRemove: Responder, event: Event) => {
      setState(state => {
        return {
          ...state,
          [event]: state[event].filter(
            responder => responder !== responderToRemove
          ),
        }
      })
    },
    []
  )

  const setters = useMemo(
    () => ({
      pushResponder,
      removeResponder,
    }),
    [pushResponder, removeResponder]
  )

  return tuple(state, setters)
}

type DndRespondersStore = ReturnType<typeof useDndRespondersStore>
type DndRespondersActions = DndRespondersStore[1]

export type { DndRespondersStore, Responder, Event, DndRespondersActions }

export default useDndRespondersStore
