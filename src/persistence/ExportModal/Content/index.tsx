import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useDietForm } from 'diets'
import { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
import { Loader } from 'general'
import prettyBytes from 'pretty-bytes'

type Props = {
  onClose: () => void
}

const Exporter = lazy(() => import('./Exporter'))

function Content({ onClose }: Props) {
  const dietForm = useDietForm()
  const [url, setUrl] = useState<string>()
  const [size, setSize] = useState<number>()
  const [hasInitialLoader, setHasInitialLoader] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHasInitialLoader(false)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  function onBlobUpdate(blob: Blob) {
    setUrl(URL.createObjectURL(blob))
    setSize(blob.size)
  }

  return (
    <ModalContent>
      <ModalHeader>Export</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {hasInitialLoader ? (
          <Loader label="Exporting..." />
        ) : (
          <Suspense fallback={<Loader label="Exporting..." />}>
            <Exporter onBlobUpdate={onBlobUpdate} />
          </Suspense>
        )}
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          as="a"
          download={dietForm.fileName || 'mealPlan'}
          target="_blank"
          href={url}
          isDisabled={!url}
          colorScheme="teal"
          variant="solid"
        >
          {size === undefined
            ? 'Download PDF'
            : `Download PDF (${prettyBytes(size)})`}
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
