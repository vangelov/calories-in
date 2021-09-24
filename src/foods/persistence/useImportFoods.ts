import { Food } from 'foods'
import { selectFile, readFile, useFileImportError } from 'persistence'
import { FoodsListModalDisclosure } from './FoodsListModal'

type Params = {
  foodsListModalDisclosure: FoodsListModalDisclosure
}

function useImportFoods({ foodsListModalDisclosure }: Params) {
  const fileImportError = useFileImportError()

  async function onImport() {
    const file = await selectFile('text/json')

    try {
      const text = await readFile(file)
      const foodsToImport = JSON.parse(text) as Food[]

      foodsListModalDisclosure.onOpen({ foodsToImport })
    } catch (error: any) {
      fileImportError.onError({ error, file })
    }
  }

  return {
    onImport,
  }
}

export default useImportFoods
