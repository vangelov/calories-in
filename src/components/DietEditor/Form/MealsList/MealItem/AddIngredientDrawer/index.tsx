import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Select,
  Box,
} from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { FixedSizeList as List } from 'react-window'

import { useFoodsListState } from 'core/foods'
import { Search } from 'react-feather'
import FoodItem from './FoodItem'
import useResizeObserver from 'use-resize-observer'
import { forwardRef } from 'react'

const innerElementType = forwardRef<any, any>(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      height: `${parseFloat(style.height) + 12}px`,
    }}
    {...rest}
  />
))

const SearchStyled = chakra(Search)

type Props = {
  onClose: () => void
  isOpen: boolean
  onSave: () => void
}

function AddIngredientDrawer({ onClose, isOpen, onSave }: Props) {
  const foodsList = useFoodsListState()
  const { ref, height = 1 } = useResizeObserver<HTMLDivElement>()

  console.log('h', height)

  return (
    <Drawer isOpen={isOpen} size="md" placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add foods</DrawerHeader>

        <DrawerBody>
          <Flex width="100%" height="100%" flexDirection="column">
            <Box>
              <RadioGroup value="1">
                <Stack direction="row" spacing={5}>
                  <Radio colorScheme="brand" size="lg" value="1">
                    Select Foods
                  </Radio>
                  <Radio value="2" size="lg">
                    Create Food
                  </Radio>
                </Stack>
              </RadioGroup>

              <Flex mt={6}>
                <InputGroup size="lg" flex={2} mr={1}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={
                      <SearchStyled pointerEvents="none" color="gray.400" />
                    }
                  />
                  <Input autoFocus={true} placeholder="Search by name" />
                </InputGroup>

                <Select size="lg" flex={1} placeholder="Cagegory">
                  <option value="option1">Red meat</option>
                  <option value="option2">Poultry</option>
                  <option value="option3">Fats, butters and oils</option>
                </Select>
              </Flex>
            </Box>

            <Divider mt={3} width="100%" />

            <Box position="relative" ref={ref} flex={1}>
              <List
                style={{ position: 'absolute', top: 0 }}
                innerElementType={innerElementType}
                height={height}
                itemCount={foodsList.length}
                itemSize={82}
                width="100%"
              >
                {({ style, index }: any) => (
                  <FoodItem
                    style={{
                      ...style,
                      top: `${parseFloat(style.top) + 12}px`,
                    }}
                    food={foodsList[index]}
                  />
                )}
              </List>
            </Box>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" size="lg" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" size="lg" onClick={onSave}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default AddIngredientDrawer
