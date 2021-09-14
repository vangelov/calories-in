import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
import { Loader } from 'general'
import DownloadButton from './DownloadButton'

type Props = {
  onClose: () => void
}

const Exporter = lazy(() => import('./Exporter'))

function Content({ onClose }: Props) {
  const [blob, setBlob] = useState<Blob>()
  const [hasInitialLoader, setHasInitialLoader] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHasInitialLoader(false)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <ModalContent>
      <ModalHeader>Export</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {hasInitialLoader ? (
          <Loader label="Exporting..." />
        ) : (
          <Suspense fallback={<Loader label="Exporting..." />}>
            <Exporter onBlobUpdate={setBlob} />
          </Suspense>
        )}
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>

        <DownloadButton blob={blob} onClose={onClose} />
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
