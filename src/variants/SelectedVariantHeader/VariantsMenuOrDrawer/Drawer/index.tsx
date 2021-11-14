import {
  Drawer as DrawerBase,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  Button,
  Divider,
  VStack,
} from '@chakra-ui/react'
import { useDietForm } from 'diets'
import { VariantForm } from 'variants'
import VariantItem from './VariantItem'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect: (variantForm: VariantForm, index: number) => void
  onCreate: () => void
  onReorder: () => void
  canReorder: boolean
}

function Drawer({
  isOpen,
  onClose,
  onSelect,
  onCreate,
  onReorder,
  canReorder,
}: Props) {
  const { variantsForms, selectedVariantFormIndex } = useDietForm()

  return (
    <DrawerBase isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxHeight="500px">
        <DrawerCloseButton />
        <DrawerHeader fontSize="md">Variants</DrawerHeader>

        <DrawerBody>
          {variantsForms.map((variantForm, index) => {
            const { fieldId, name } = variantForm
            const isSelected = index === selectedVariantFormIndex

            return (
              <VariantItem
                key={fieldId}
                name={name}
                isSelected={isSelected}
                onClick={() => {
                  onClose()
                  onSelect(variantForm, index)
                }}
              />
            )
          })}
          <Divider mt={1} />
        </DrawerBody>

        <DrawerFooter>
          <VStack width="100%" spacing={3}>
            <Button
              colorScheme="teal"
              onClick={() => {
                onCreate()
                onClose()
              }}
              isFullWidth={true}
            >
              Create new
            </Button>

            {canReorder && (
              <Button
                colorScheme="teal"
                onClick={() => {
                  onReorder()
                  onClose()
                }}
                isFullWidth={true}
                variant="outline"
              >
                Re-order
              </Button>
            )}
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </DrawerBase>
  )
}

export default Drawer
