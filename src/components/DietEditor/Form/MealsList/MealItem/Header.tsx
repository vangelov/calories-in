import { Input, Flex, IconButton } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MealField, getMealsFormsPath, IngredientField } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import StatsLayout from 'components/general/StatsLayout'
import StatValue from 'components/general/StatValue'
import { Menu, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import { useState } from 'react'
import RightAligned from 'components/general/RightAligned'

type Props = {
  mealField: MealField
  ingredientsFields: IngredientField[]
  zIndex: number
  index: number
  onRemove: (index: number) => void
}

function Header({
  mealField,
  index,
  onRemove,
  ingredientsFields,
  zIndex,
}: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register(getMealsFormsPath(index, 'name'))
  const { mealStats } = useMealStats(index, mealField, ingredientsFields)
  const [test, setTest] = useState(false)

  useUpdateMealStats(index, mealStats)

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  const amountInGrams = mealStats.amountInGrams

  return (
    <Flex
      position="sticky"
      top="0"
      bg="gray.50"
      py={4}
      px={6}
      zIndex={test ? 1000 : zIndex}
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
    >
      <StatsLayout
        nameElement={
          <Input
            {...nameRegister}
            onChange={onNameChange}
            autoComplete="off"
            bg="white"
            borderColor="gray.200"
            width="85%"
            fontWeight="bold"
            fontSize="lg"
            defaultValue={mealField.name}
          />
        }
        amountElement={
          <StatValue
            label="Amount"
            color="gray.500"
            value={`${amountInGrams}g`}
          />
        }
        energyElement={
          <StatValue
            label="Energy"
            color="gray.500"
            value={`${amountInGrams * 10}kcal`}
          />
        }
        proteinElement={
          <StatValue
            label="Protein"
            color="gray.500"
            value={`${amountInGrams * 2}g`}
          />
        }
        carbsElement={
          <StatValue
            label="Carbs"
            color="gray.500"
            value={`${amountInGrams * 2.5}g`}
          />
        }
        fatElement={
          <StatValue
            label="Fat"
            color="gray.500"
            value={`${amountInGrams * 1.5}g`}
          />
        }
        menuElement={
          <RightAligned>
            <Menu
              arrow
              align="end"
              viewScroll="close"
              onChange={e => setTest(e.open)}
              menuButton={
                <IconButton
                  aria-label="test"
                  icon={<MoreHorizontal color="gray" pointerEvents="none" />}
                  variant="ghost"
                />
              }
            >
              <MenuItem onClick={() => onRemove(index)}>Remove</MenuItem>
              <MenuItem>Cancel</MenuItem>
            </Menu>
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default Header
