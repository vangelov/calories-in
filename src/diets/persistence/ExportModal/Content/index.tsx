import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
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

      {blob && url && (
        <ModalFooter>
          <Button
            mr={3}
            variant="outline"
            colorScheme="teal"
            onClick={onViewInBrowser}
          >
            View in browser
          </Button>

          <DownloadButton
            blob={blob}
            onClose={onClose}
            label="Download"
            fileName={variantForm.name}
            isLoading={blob === undefined}
          />
        </ModalFooter>
      )}
    </ModalContent>
  )
}

export default Content
