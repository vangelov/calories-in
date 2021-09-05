import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible'
import { useState } from 'react'
import { Suspense, lazy } from 'react'

type Props = {
  onClose: () => void
}

const Preview = lazy(() => import('./Preview'))

function Content({ onClose }: Props) {
  const [url, setUrl] = useState<string>()

  function onUrlUpdate(newUrl: string) {
    if (!url) {
      setUrl(newUrl)
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Modal Title</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Suspense fallback={<div>Loading...</div>}>
          <Preview onUrlUpdate={onUrlUpdate} />
        </Suspense>
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          as="a"
          href={url}
          isDisabled={!url}
          colorScheme="teal"
          variant="solid"
        >
          Download
        </Button>
      </ModalFooter>
    </ModalContent>
  )
}

export default Content
