import { DietForm } from 'core/dietForm'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'

function Watcher() {
  const { control } = useFormContext()
  const form = useWatch({ control }) as DietForm
  const { push } = useUndoRedoMethods()

  useEffect(() => {
    push(form)
  }, [form, push])

  return null
}

export default Watcher
