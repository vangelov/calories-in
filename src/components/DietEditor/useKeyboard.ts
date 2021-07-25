import { useEffect } from 'react'

type Params = {
  undo: () => void
  redo: () => void
}

function useKeyboard({ undo, redo }: Params) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const { ctrlKey, metaKey, shiftKey, code } = event

      if (code === 'KeyZ' && (ctrlKey || metaKey)) {
        event.preventDefault()
        if (shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [undo, redo])
}

export default useKeyboard
