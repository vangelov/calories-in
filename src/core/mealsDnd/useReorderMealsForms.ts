import { useDragAndDropResponder } from 'core/dndResponders'
import { useUndoRedoMethods } from 'core/undoRedo'
import { DropResult } from 'react-beautiful-dnd'

type Params = {
  moveMealForm: (from: number, to: number) => void
}

function useReorderMealsForms({ moveMealForm }: Params) {
  const { saveLastChange } = useUndoRedoMethods()

  useDragAndDropResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'mealsList') {
      return
    }

    moveMealForm(source.index, destination.index)

    saveLastChange()
  })
}

export default useReorderMealsForms
