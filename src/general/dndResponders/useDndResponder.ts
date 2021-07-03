import { Responder, Event } from './useDndRespondersStore'
import { useEffect } from 'react'
import { useDndRespondersStoreMethods } from './DndRespondersStoreProvider'

function useDndResponder(event: Event, responder: Responder) {
  const { pushResponder, removeResponder } = useDndRespondersStoreMethods()

  useEffect(() => {
    pushResponder(responder, event)

    return () => {
      removeResponder(responder, event)
    }
  })
}

export default useDndResponder
