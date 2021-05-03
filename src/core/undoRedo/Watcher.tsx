import { DietForm } from 'core/dietForm'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'

function Watcher() {
  const form = useWatch({}) as DietForm
  const { pushForm } = useUndoRedoMethods()

  console.log('push')

  useEffect(() => {
    pushForm(form)
  }, [form, pushForm])

  return null
}

export default Watcher
