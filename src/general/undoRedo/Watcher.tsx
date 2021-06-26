import { DietForm } from 'core/diets'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { useUndoRedoMethods } from 'general/undoRedo'

function Watcher() {
  const form = useWatch({}) as DietForm
  const { pushForm } = useUndoRedoMethods()

  console.log('form')

  useEffect(() => {
    pushForm(form)
  }, [form, pushForm])

  return null
}

export default Watcher
