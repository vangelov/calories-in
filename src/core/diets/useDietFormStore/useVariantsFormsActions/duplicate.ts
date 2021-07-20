import deepCopy from 'general/deepCopy'
import { VariantForm } from '../../variants'
import { v4 as uuidv4 } from 'uuid'

function duplicate(originalVariantForm: VariantForm) {
  const copiedVariantForm = deepCopy(
    originalVariantForm,
    (key: string, value: any) => {
      if (key === 'fieldId') {
        return uuidv4()
      }

      return value
    }
  ) as VariantForm

  return copiedVariantForm
}

export default duplicate
