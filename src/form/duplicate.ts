import { deepCopy } from 'general'
import { v4 as uuidv4 } from 'uuid'
import { Form } from './types'

function duplicate<T extends Form>(originalForm: T) {
  const copiedForm = deepCopy(originalForm, (key: string, value: any) => {
    if (key === 'fieldId') {
      return uuidv4()
    }

    return value
  }) as T

  return copiedForm
}

export default duplicate
