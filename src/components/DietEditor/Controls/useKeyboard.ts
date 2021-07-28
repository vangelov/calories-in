import { useContext, useEffect } from 'react'
import { ContentBoxRefContext } from 'components/layout/MainLayout'
import { useFormChangesStoreMethods } from 'general/undoRedo'

function useKeyboard() {
  const formChangesActions = useFormChangesStoreMethods()
  const contentBoxRef = useContext(ContentBoxRefContext)
  const node = contentBoxRef.current

  useEffect(() => {
    if (!node) {
      return
    }

    function onNodeKeyDown(event: KeyboardEvent) {
      const { ctrlKey, metaKey, shiftKey, code } = event

      if (code === 'KeyZ' && (ctrlKey || metaKey)) {
        event.preventDefault()

        if (shiftKey) {
          formChangesActions.redo()
        } else {
          formChangesActions.undo()
        }
      }
    }

    function onBodyKeyDown(event: KeyboardEvent) {
      if (event.target === document.body) {
        onNodeKeyDown(event)
      }
    }

    node.addEventListener('keydown', onNodeKeyDown)
    document.body.addEventListener('keydown', onBodyKeyDown)

    return () => {
      node.removeEventListener('keydown', onNodeKeyDown)
      document.body.removeEventListener('keydown', onBodyKeyDown)
    }
  }, [formChangesActions, node])
}

export default useKeyboard
