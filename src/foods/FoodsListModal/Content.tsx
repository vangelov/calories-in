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

type Props = {
  onClose: () => void
  title: string
}

function Content({ onClose, title }: Props) {
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
          onFoodPreview={() => {}}
          areItemsInteractive={false}
        />
      </ModalBody>

      <ModalFooter>
        <HStack spacing={3}>
          <Button onClick={onClose}>Close</Button>

          <DownloadButton
            blob={blob}
            onClose={onClose}
            fileName={getUntitledFileName({ prefix: 'foods' })}
            label="Download JSON"
          />
        </HStack>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
