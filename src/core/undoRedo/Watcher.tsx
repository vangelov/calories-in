import { DietForm } from 'core/dietForm'
import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'

function Watcher() {
  const { control } = useFormContext()
  const form = useWatch({ control }) as DietForm
  const { pushForm } = useUndoRedoMethods()

  useEffect(() => {
    pushForm(form)
  }, [form, pushForm])

  return null
}

export default Watcher
