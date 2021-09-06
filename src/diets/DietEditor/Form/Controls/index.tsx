import { Flex, useDisclosure } from '@chakra-ui/react'
import UndoRedoButtons from './UndoRedoButtons'
import MenuButtons from './MenuButtons'
import MainButtons from './MainButtons'
import { useDietFormActions } from 'diets'
import useKeyboard from './useKeyboard'
import { ExportModal } from 'persistence'

type Props = {
  onImport: () => void
}

function Controls({ onImport }: Props) {
  const dietFormStoreActions = useDietFormActions()
  const modalDisclosure = useDisclosure()

  useKeyboard()

  /*if (filesContent.length > 0 && !loading) {
    const subject = '/Subject'
    const index = filesContent[0].content.indexOf('/Subject')
    const index2 = filesContent[0].content.indexOf('R', index)
    const location = filesContent[0].content
      .slice(index + subject.length, index2)
      .trim()
    const locationName = `${location} obj`
    const objIndex = filesContent[0].content.indexOf(locationName)
    const objEnd = filesContent[0].content.indexOf('endobj', objIndex)

    const data = filesContent[0].content.slice(
      objIndex + locationName.length + 2,
      objEnd - 2
    )

    console.log('i', JSON.parse(data))
  }*/

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <UndoRedoButtons />
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <MenuButtons onImport={onImport} />

        <MainButtons
          onMealAdd={dietFormStoreActions.appendMealForm}
          onSave={() => {}}
          onExport={modalDisclosure.onOpen}
        />

        <ExportModal
          isOpen={modalDisclosure.isOpen}
          onClose={modalDisclosure.onClose}
        />
      </Flex>
    </Flex>
  )
}

export default Controls
