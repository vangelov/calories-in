import { VariantsFieldArray } from '../useVariantsFieldArray'
import { useDndResponder } from 'general/dndResponders'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { DropResult } from 'react-beautiful-dnd'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useReorderVariantsForms({ variantsFieldArray }: Params) {
  const { saveLastChange } = useFormChangesStoreMethods()

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'variantsList') {
      return
    }

    if (destination.index !== source.index) {
      variantsFieldArray.moveVariantForm(source.index, destination.index)
      variantsFieldArray.setSelectedVariantFormIndex(destination.index)
    }

    saveLastChange()
  })
}

export default useReorderVariantsForms
