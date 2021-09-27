import { UseDisclosureReturn } from '@chakra-ui/hooks'
import { Food } from 'foods'
import { selectFile, readFile, useFileImportError } from 'persistence'
import { useState } from 'react'

type Params = {
  foodsListModalDisclosure: UseDisclosureReturn
}

function useImportFoods({ foodsListModalDisclosure }: Params) {
  const fileImportError = useFileImportError()
  const [foodsToImport, setFoodsToImport] = useState<Food[]>()

  async function onImport() {
    const file = await selectFile('text/json')

    try {
      const text = await readFile(file)
      const foodsToImport = JSON.parse(text) as Food[]
      setFoodsToImport(foodsToImport)
      foodsListModalDisclosure.onOpen()
    } catch (error: any) {
      fileImportError.onError({ error, file })
    }
  }

  return {
    onImport,
    foodsToImport,
  }
}

export default useImportFoods
