import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
  HStack,
} from '@chakra-ui/react'
import { FoodsList, useFoods } from 'foods'
import { DownloadButton, getUntitledFileName } from 'persistence'
import { useState } from 'react'

type Action = 'import' | 'export'

type Props = {
  onClose: () => void
  title: string
  onImport: () => void
  action: Action
}

function Content({ onClose, title, onImport, action }: Props) {
  const { allFoods } = useFoods()

  const [blob] = useState(() => {
    const allFoodsString = JSON.stringify(allFoods)
    return new Blob([allFoodsString])
  })

  return (
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <FoodsList
          allowsFiltering={false}
          height="350px"
          itemUsageType="nonInteractive"
        />
      </ModalBody>

      <ModalFooter>
        <HStack spacing={3}>
          <Button onClick={onClose}>Close</Button>

          {action === 'import' ? (
            <Button
              isDisabled={allFoods.length === 0}
              variant="solid"
              colorScheme="teal"
              onClick={onImport}
            >
              {allFoods.length > 0
                ? `Import ${allFoods.length} ${
                    allFoods.length === 1 ? 'food' : 'foods'
                  }`
                : 'Import'}
            </Button>
          ) : (
            <DownloadButton
              blob={blob}
              onClose={onClose}
              fileName={getUntitledFileName({ prefix: 'foods' })}
              label="Export"
              isDisabled={allFoods.length === 0}
            />
          )}
        </HStack>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
