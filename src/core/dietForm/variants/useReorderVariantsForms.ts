import { VariantsFieldArray } from './useVariantsFieldArray'
import { useDragAndDropResponder } from 'core/dndResponders'
import { useUndoRedoMethods } from 'core/undoRedo'
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

    variantsFieldArray.moveVariantForm(source.index, destination.index)
    variantsFieldArray.setSelectedVariantFormIndex(destination.index)

    saveLastChange()
  })
}

export default useReorderVariantsForms
