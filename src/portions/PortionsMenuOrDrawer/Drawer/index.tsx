import {
  Drawer as DrawerBase,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Portion } from 'portions'
import PortionItem from './PortionItem'

type Props = {
  isOpen: boolean
  onClose: () => void
  onChange: (portion: Portion) => void
  selectedPortionId: string
  portions: Portion[]
}

function Drawer({
  portions,
  isOpen,
  onClose,
  onChange,
  selectedPortionId,
}: Props) {
  return (
    <DrawerBase isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxHeight="500px">
        <DrawerCloseButton />
        <DrawerHeader fontSize="md">Portions</DrawerHeader>

        <DrawerBody>
          {portions.map(portion => {
            const { id } = portion
            const isSelected = id === selectedPortionId

            return (
              <PortionItem
                key={id}
                portion={portion}
                isSelected={isSelected}
                onClick={() => {
                  onClose()
                  onChange(portion)
                }}
              />
            )
          })}
        </DrawerBody>
      </DrawerContent>
    </DrawerBase>
  )
}

export default Drawer
