import { VariantsFieldArray } from 'core/dietForm'
import { useDragAndDropResponder } from 'core/dndResponders'
import { DropResult } from 'react-beautiful-dnd'

type Params = {
  variantsFieldArray: VariantsFieldArray
}

function useReorderVariantsForms({ variantsFieldArray }: Params) {
  useDragAndDropResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'variantsList') {
      return
    }

    variantsFieldArray.onMoveVariantForm(source.index, destination.index)
  })
}

export default useReorderVariantsForms
