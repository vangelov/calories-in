import { DietForm } from 'core/diets'
import { useEffect } from 'react'
import { useWatch } from 'react-hook-form'
import { useFormChangesStoreMethods } from './FormChangesStoreProvider'

function Watcher() {
  const form = useWatch({}) as DietForm
  const { pushForm } = useFormChangesStoreMethods()

  useEffect(() => {
    pushForm(form)
  }, [form, pushForm])

  return null
}

export default Watcher
