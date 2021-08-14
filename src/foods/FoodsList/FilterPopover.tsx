import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Checkbox,
  IconButton,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { Filter } from 'react-feather'
import { ChangeEvent } from 'react'
import { FoodsFilter, nonQueryChangesCount } from 'foods-filters'
import { FoodCategoriesSelect } from 'foods-categories'
import { useRef } from 'react'
import { useScreenSize, Badge } from 'general'

type Props = {
  filter: FoodsFilter
  onFoodCategoryIdChange: (foodCategoryId: number) => void
  onOnlyFoodsAddedByUserChange: (onlyFoodsAddedbyUser: boolean) => void
  onReset: () => void
}

function FiltersPopover({
  filter,
  onFoodCategoryIdChange,
  onOnlyFoodsAddedByUserChange,
  onReset,
}: Props) {
  const selectRef = useRef<HTMLSelectElement>(null)

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    onFoodCategoryIdChange(Number(value))
  }

  function onCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target
    onOnlyFoodsAddedByUserChange(checked)
  }

  const screenSize = useScreenSize()
  const changesCount = nonQueryChangesCount(filter)

  return (
    <Popover
      placement={screenSize >= 2 ? 'left' : 'bottom'}
      initialFocusRef={selectRef}
    >
      {({ onClose }) => {
        return (
          <>
            <PopoverTrigger>
              <Badge count={changesCount}>
                <IconButton
                  size="md"
                  aria-label="Add variant"
                  icon={<Filter size={20} pointerEvents="none" />}
                  variant="outline"
                />
              </Badge>
            </PopoverTrigger>

            <PopoverContent boxShadow="lg">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filters</PopoverHeader>

              <PopoverBody>
                <VStack spacing={5} p={1} alignItems="flex-start">
                  <FoodCategoriesSelect
                    ref={selectRef}
                    flex={3}
                    onChange={onSelectChange}
                    value={filter.categoryId}
                  >
                    <option value={0}>All categories</option>
                  </FoodCategoriesSelect>

                  <Checkbox
                    onChange={onCheckboxChange}
                    colorScheme="teal"
                    isChecked={Boolean(filter.onlyFoodsAddedbyUser)}
                  >
                    Only items added by me
                  </Checkbox>
                </VStack>
              </PopoverBody>

              <PopoverFooter border="0">
                <HStack spacing={3} justifyContent="flex-end">
                  <Button
                    variant="link"
                    isDisabled={changesCount === 0}
                    onClick={() => {
                      onReset()
                      onClose()
                    }}
                  >
                    Reset
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </HStack>
              </PopoverFooter>
            </PopoverContent>
          </>
        )
      }}
    </Popover>
  )
}

export default FiltersPopover
