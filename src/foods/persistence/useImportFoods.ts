import { Food } from 'foods'
import { selectFile, readFile, useImportToasts } from 'persistence'
import { FoodsListModalDisclosure } from './FoodsListModal'

type Params = {
  foodsListModalDisclosure: FoodsListModalDisclosure
}

function useImportFoods({ foodsListModalDisclosure }: Params) {
  const toasts = useImportToasts()

  async function onImport() {
    const file = await selectFile('text/json')

    try {
      const text = await readFile(file)
      const foodsToImport = JSON.parse(text) as Food[]

      foodsListModalDisclosure.onOpen({ foodsToImport })
    } catch (error) {
      if (error instanceof DOMException) {
        toasts.showCouldNotLoadFileToast(file)
      } else if (error instanceof SyntaxError) {
        toasts.showCouldNotParseFileToast(file)
      } else {
        toasts.showErrorToast(error)
      }
    }
  }

  return {
    onImport,
  }
}

export default useImportFoods
