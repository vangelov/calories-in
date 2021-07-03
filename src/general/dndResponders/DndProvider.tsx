import { ReactNode } from 'react'
import {
  DragDropContext,
  DragStart,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd'
import { useDndRespondersStoreState } from './DndRespondersStoreProvider'

type Props = {
  children: ReactNode
}

function DndProvider({ children }: Props) {
  const state = useDndRespondersStoreState()

  const onDragEnd = (dropResult: DropResult, provided: ResponderProvided) => {
    state.onDragEnd.forEach(responder => responder(dropResult, provided))
  }

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    state.onDragStart.forEach(responder => responder(initial, provided))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {children}
    </DragDropContext>
  )
}

export default DndProvider
