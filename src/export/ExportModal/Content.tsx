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
import Loader from './Loader'

type Props = {
  onClose: () => void
}

//const Preview = lazy(() => import('./Preview'))

const Exporter = lazy(() => {
  return new Promise<any>(resolve => {
    setTimeout(() => resolve(import('./Exporter')), 3000)
  })
})

function Content({ onClose }: Props) {
  const [url, setUrl] = useState<string>()
  const [hasInitialLoader, setHasInitialLoader] = useState(true)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setHasInitialLoader(false)
    }, 500)

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
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <Exporter onUrlUpdate={setUrl} />
          </Suspense>
        )}
      </ModalBody>

      <ModalFooter>
        <Button mr={3} onClick={onClose}>
          Close
        </Button>
        <Button
          as="a"
          download="test"
          target="_blank"
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
