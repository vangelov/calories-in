import {
  useDragAndDropRespondersDispatch,
  Responder,
  Event,
} from './DragAndDropRespondersProvider'
import { useEffect } from 'react'

function useDragDropEventResponder(event: Event, responder: Responder) {
  const dispatch = useDragAndDropRespondersDispatch()

  useEffect(() => {
    dispatch({ type: 'pushResponder', responder, event })

    return () => {
      dispatch({ type: 'removeResponder', responder, event })
    }
  })
}

export default useDragDropEventResponder
