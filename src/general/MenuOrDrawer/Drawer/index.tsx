import {
  Drawer as DrawerBase,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import getDrawerButtons from './getDrawerButtons'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: ReactElement | ReactElement[]
  title: string
}

function Drawer({ title, isOpen, onClose, children }: Props) {
  return (
    <DrawerBase isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxHeight="500px">
        <DrawerCloseButton />
        <DrawerHeader fontSize="md">{title}</DrawerHeader>

        <DrawerBody mb={4}>
          <VStack width="100%" spacing={3}>
            {getDrawerButtons(children, onClose)}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </DrawerBase>
  )
}

export { getDrawerButtons }

export default Drawer
