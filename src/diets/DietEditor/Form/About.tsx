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
  List,
  ListIcon,
} from '@chakra-ui/react'
import { CheckCircle } from 'react-feather'

type Props = {
  isOpen: boolean
  onClose: () => void
}

function About({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>About </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">
            <Text>Hi, I'm Vladimir, the person behind this project.</Text>
            <br />
            <Text>
              <Text fontWeight="semibold" as="span" textColor="teal.600">
                Calories-In
              </Text>{' '}
              is made for people who follow meal plans that involve preparing
              everything by yourself and gives them full control to fine tune
              the nutritional values.
            </Text>
            <br />
            <Text>
              The idea was born out of my experience of trying to find a better
              alternative to Google Sheets for calculating the macros of my own
              meal plans. I wanted to be able to do this on desktop as it's more
              convenient but nothing really felt fast and simple enough.
            </Text>
            <br />
            <Text>The main differences to other apps in this space are:</Text>
            <br />
            <List ml={8}>
              <ListItem>
                <ListIcon as={CheckCircle} color="teal.600" />
                <Text fontWeight="semibold" as="span" textColor="teal.600">
                  Faster search
                </Text>
                <Text mt={1}>
                  There are actually not that many foods you need when you
                  prepare everything yourself. This means all of the food data
                  can be downloaded beforehand which makes the search super
                  fast. Of course you can add your own foods if you'd like.{' '}
                </Text>
              </ListItem>
              <br />
              <ListItem>
                <ListIcon as={CheckCircle} color="teal.600" />
                <Text fontWeight="semibold" as="span" textColor="teal.600">
                  Undo/Redo
                </Text>
                <Text mt={1}>
                  Building a plan from scratch or updating an existing one
                  involves some back and forth choosing the right foods and
                  adjusting their amounts. This is especially true if you want
                  to be as close as possible to a specific calorie limit and
                  have your macros be a certain percentages split.
                </Text>
              </ListItem>
              <br />
              <ListItem>
                <ListIcon as={CheckCircle} color="teal.600" />
                <Text fontWeight="semibold" as="span" textColor="teal.600">
                  Faster export
                </Text>
                <Text mt={1}>
                  Creating the PDF file for your meal plan is done entirely
                  inside the browser. It does not involve generating and
                  downloading it from a server. This means I can keep the cost
                  of running the website low and you get your file in just a few
                  seconds.
                </Text>
              </ListItem>
              <br />
              <ListItem>
                <ListIcon as={CheckCircle} color="teal.600" />
                <Text fontWeight="semibold" as="span" textColor="teal.600">
                  Simpler
                </Text>

                <Text mt={1}>
                  There are no other pages except the editor. Most of the other
                  tools are bloated with additional features for professionals,
                  such as managing clients, creating invoices, etc.
                </Text>
              </ListItem>
              <br />
              <ListItem>
                <ListIcon as={CheckCircle} color="teal.600" />
                <Text fontWeight="semibold" as="span" textColor="teal.600">
                  Fully mobile
                </Text>
                <Text mt={1}>
                  You can use your phone or tablet to build your meal plans
                  right from your browser. If you add the app to your home
                  screen it will look and feel almost like a native one.
                </Text>
              </ListItem>
            </List>
            <br />
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
