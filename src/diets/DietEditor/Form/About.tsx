import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Link,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function About({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">
            Hi, I'm Vladimir, the creator of <strong>Calories-In</strong>.{' '}
            <br />
            <br />
            The idea for this app was born out of my experience of trying to
            find a better alternative to Google Sheets for calculating the
            macros of my meal plans. I tried different tools but nothing really
            felt fast and simple enough. So I decided to scratch my own itch.{' '}
            <br /> <br />
            Let me know if you found it useful or have any comments in general:{' '}
            <br /> <br />
            <Link href="mailto:vladimir@calories-in.com">
              <Button size="lg" colorScheme="teal">
                Contact me directly
              </Button>
            </Link>
            <br />
            <br />
            No email will go unanswered, I promise :)
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button size="lg" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default About
