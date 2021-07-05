import makeUseContext from 'general/makeUseContext'
import { createContext, ReactNode } from 'react'
import useDndRespondersStore, {
  DndRespondersStore,
} from './useDndRespondersStore'
import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'

const StateContext = createContext<DndRespondersStore[0] | undefined>(undefined)
const MethodsContext = createContext<DndRespondersStore[1] | undefined>(
  undefined
)
const useDndRespondersStoreState = makeUseContext(StateContext)
const useDndRespondersStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: ReactNode
}

function DndRespondersStoreProvider({ children }: Props) {
  const [state, methods] = useDndRespondersStore()

  const onDragEnd = (dropResult: DropResult, provided: ResponderProvided) => {
    state.onDragEnd.forEach(responder => responder(dropResult, provided))
  }

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    state.onDragStart.forEach(responder => responder(initial, provided))
  }

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          {children}
        </DragDropContext>
      </StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useDndRespondersStoreMethods, useDndRespondersStoreState }

export default DndRespondersStoreProvider
