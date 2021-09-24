import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Suspense, lazy } from 'react'
import { Loader } from 'general'
import { DownloadButton, getUntitledFileName } from 'persistence'
import { useDietForm } from 'diets'

type Props = {
  onClose: () => void
}

const Exporter = lazy(() => import('./Exporter'))

function Content({ onClose }: Props) {
  const [blob, setBlob] = useState<Blob>()
  const dietForm = useDietForm()
  const fileName = dietForm.name || getUntitledFileName()

  return (
    <ModalContent>
      <ModalHeader>Export</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Suspense fallback={<Loader label="Loading..." />}>
          <Exporter onBlobUpdate={setBlob} />
        </Suspense>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>

        <DownloadButton
          blob={blob}
          onClose={onClose}
          label="Download PDF"
          fileName={fileName}
        />
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
