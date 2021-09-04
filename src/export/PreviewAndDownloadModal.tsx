import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm } from 'diets'
import { useFoods } from 'foods'
import { Download } from 'react-feather'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function PreviewAndDownloadModal({ isOpen, onClose }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()

  function onRender({ blob }: ReactPDF.OnRenderProps) {
    console.log('test', blob)
  }

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PDFViewer showToolbar={false} width="100%" height="300px">
            <PdfDietEditor
              dietForm={dietForm}
              foodsById={foodsById}
              onRender={onRender}
              subject={JSON.stringify(dietForm)}
            />
          </PDFViewer>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            colorScheme="teal"
            variant="solid"
            leftIcon={<Download />}
          >
            Download
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PreviewAndDownloadModal
