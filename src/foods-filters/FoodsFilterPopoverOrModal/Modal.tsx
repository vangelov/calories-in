import {
  Modal as ModalBase,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useRef } from 'react'
import Content from './Content'
import Footer from './Footer'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function Modal({ isOpen, onClose }: Props) {
  const selectRef = useRef<HTMLSelectElement>(null)

  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Content selectRef={selectRef} />
        </ModalBody>

        <ModalFooter>
          <Footer onClose={onClose} />
        </ModalFooter>
      </ModalContent>
    </ModalBase>
  )
}

export default Modal
