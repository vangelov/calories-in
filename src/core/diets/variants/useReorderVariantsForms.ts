import { VariantsFieldArray } from './useVariantsFieldArray'
import { useDragAndDropResponder } from 'general/dndResponders'
import { useUndoRedoMethods } from 'general/undoRedo'
import { DropResult } from 'react-beautiful-dnd'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useReorderVariantsForms({ variantsFieldArray }: Params) {
  const { saveLastChange } = useUndoRedoMethods()

  useDragAndDropResponder('onDragEnd', (result: DropResult) => {
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
