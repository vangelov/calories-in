import { DietForm } from 'core/dietForm'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'

function Watcher() {
  const form = useWatch({}) as DietForm
  useWatch({ name: 'selectedVariantFieldId' })
  const { pushForm } = useUndoRedoMethods()

  console.log('form', form)

  useEffect(() => {
    pushForm(form)
  }, [form, pushForm])

  return null
}

export default Watcher
