import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useState, useCallback } from 'react'
import { DownloadButton } from 'persistence'
import { useDietForm } from 'diets'
import Exporter from './Exporter'

type Props = {
  onClose: () => void
}

function Content({ onClose }: Props) {
  const [blob, setBlob] = useState<Blob>()
  const [url, setUrl] = useState<string>()
  const dietForm = useDietForm()

  const onUpdate = useCallback((blob: Blob, url: string) => {
    setBlob(blob)
    setUrl(url)
  }, [])

  function onViewInBrowser() {
    window.open(url, '_blank')
  }

  return (
    <ModalContent>
      <ModalHeader fontWeight="normal">
        Export{' '}
        <Text as="span" fontWeight="bold">
          {dietForm.name}
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody px={0}>
        <Exporter onUpdate={onUpdate} />
      </ModalBody>

      <ModalFooter>
        <VStack spacing={3} width="100%">
          {blob && url && (
            <DownloadButton
              blob={blob}
              onClose={onClose}
              label="Download"
              isFullWidth={true}
              fileName={dietForm.name}
              isLoading={blob === undefined}
            />
          )}
          {blob && url && (
            <Button
              mr={3}
              variant="outline"
              colorScheme="teal"
              onClick={onViewInBrowser}
              isFullWidth={true}
            >
              View in browser
            </Button>
          )}

          <Button isFullWidth={true} variant="solid" onClick={onClose}>
            Close
          </Button>
        </VStack>
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
