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
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function About({ isOpen, onClose }: Props) {
  function onContact() {
    window.location.href = 'mailto:vladimir@calories-in.com'
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">
            <Text>Hi, I'm Vladimir, the person behind this app.</Text>
            <br />
            <Text>
              <strong>Calories-In</strong> is targeted at people who have
              experience creating meal plans that involve preparing everything
              by yourself and gives them full control to fine tune the
              nutritional values.
            </Text>
            <br />
            <Text>
              The idea was born out of my experience of trying to find a better
              alternative to Google Sheets for calculating the macros of my meal
              plans. I tried different tools but nothing really felt fast and
              simple enough.
            </Text>
            <br />
            <Text>The main differences to other apps in this space are:</Text>
            <br />
            <UnorderedList ml={8}>
              <ListItem>
                <strong>Less foods</strong>: There are actually not that many
                foods you need when you prepare everything yourself. This means
                all of the food data can be downloaded beforehand which makes
                the search super fast. Of course you can add your own foods if
                you'd like.{' '}
              </ListItem>
              <br />
              <ListItem>
                <strong>Undo/Redo</strong>: Building a plan from scratch or
                updating an existing one involves some back and forth choosing
                the right foods and adjusting their amounts. This is especially
                true if you want to be as close as possible to a specific
                calorie limit and have your macros be a certain percentages
                split.
              </ListItem>
              <br />
              <ListItem>
                <strong>Local PDF export</strong>: Creating the PDF file for
                your meal plan is done entirely inside the browser. It does not
                involve generating and downloading it from a server. This means
                I can keep the cost of running the website low and you get your
                file in less than 2 seconds.
              </ListItem>
              <br />
              <ListItem>
                <strong>More focus</strong>: There are no other pages except the
                editor. Most of the other tools are bloated with additional
                pages for professionals, such as managing clients, creating
                invoices, etc.
              </ListItem>
            </UnorderedList>
            <Text>
              <br />
              Let me know if you found it useful or have any comments in
              general:
            </Text>
            <br />

            <Button size="lg" colorScheme="teal" onClick={onContact}>
              Contact me directly
            </Button>

            <br />
            <br />
            <Text>No email will go unanswered, I promise :)</Text>
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
