import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useState, useCallback } from 'react'
import { Suspense, lazy } from 'react'
import { Loader } from 'general'
import { DownloadButton } from 'persistence'
import { useDietForm } from 'diets'

type Props = {
  onClose: () => void
}

const Exporter = lazy(() => import('./Exporter'))

function Content({ onClose }: Props) {
  const [blob, setBlob] = useState<Blob>()
  const [url, setUrl] = useState<string>()
  const dietForm = useDietForm()
  const { variantsForms, selectedVariantFormIndex } = dietForm
  const variantForm = variantsForms[selectedVariantFormIndex]

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
          {variantForm.name}
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody px={0}>
        <Suspense fallback={<Loader label="Preparing..." />}>
          <Exporter onUpdate={onUpdate} />
        </Suspense>
      </ModalBody>

      <ModalFooter>
        <VStack spacing={3} width="100%">
          {blob && url && (
            <DownloadButton
              blob={blob}
              onClose={onClose}
              label="Download"
              isFullWidth={true}
              fileName={variantForm.name}
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

          <Button isFullWidth={true} variant="solid" onClick={onViewInBrowser}>
            Close
          </Button>
        </VStack>
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
