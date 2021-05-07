import {
  Box,
  useDisclosure,
  Text,
  Flex,
  Tooltip,
  IconButton,
  chakra,
} from '@chakra-ui/react'
import { useElementHeightState } from 'core/ElementHeightProvider'
import { RefObject } from 'react'
import AddFoodDialog from './AddFoodDialog'
import useAddFood from './useAddFood'
import { Plus } from 'react-feather'

const PlusStyled = chakra(Plus)

type Props = {
  getFoodCategoryItemRefById: (id: number) => RefObject<HTMLDivElement>
  foodCategoriesListRef: RefObject<HTMLDivElement>
}

function FoodsControls({
  getFoodCategoryItemRefById,
  foodCategoriesListRef,
}: Props) {
  const addFoodDialogDisclosure = useDisclosure()
  const off = useElementHeightState()

  const onAddFood = useAddFood({
    foodCategoriesListRef,
    getFoodCategoryItemRefById,
  })

  async function onFoodAdded() {
    addFoodDialogDisclosure.onClose()
    onAddFood()
  }

  return (
    <Box pb={3} borderBottomWidth={1}>
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        height={`${off}px`}
      >
        <Flex alignItems="center" height="40px">
          <Text fontSize="lg">Foods</Text>
        </Flex>

        <Tooltip hasArrow label="Export" aria-label="Export tooltip">
          <IconButton
            variant="outline"
            aria-label="export"
            onClick={addFoodDialogDisclosure.onOpen}
            icon={<PlusStyled color="gray.400" pointerEvents="none" />}
          />
        </Tooltip>
      </Flex>

      <AddFoodDialog
        isOpen={addFoodDialogDisclosure.isOpen}
        onFoodAdded={onFoodAdded}
        onClose={addFoodDialogDisclosure.onClose}
      />
    </Box>
  )
}

export default FoodsControls
