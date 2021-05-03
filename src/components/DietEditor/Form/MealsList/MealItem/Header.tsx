import { Input, Button, Flex, Text, Center, IconButton } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MealField, getMealsFormsPath, IngredientField } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import StatsLayout from 'components/general/StatsLayout'
import StatValue from 'components/general/StatValue'
import { Menu, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'

type Props = {
  mealIndex: number
  mealField: MealField
  ingredientsFields: IngredientField[]
  zIndex: number
  index: number
  onRemove: (mealIndex: number) => void
}

function Header({
  mealIndex,
  mealField,
  index,
  onRemove,
  ingredientsFields,
  zIndex,
}: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register(getMealsFormsPath(mealIndex, 'name'))
  const { mealStats } = useMealStats(index, mealField, ingredientsFields)

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
      px={3}
      py={4}
      zIndex={zIndex}
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
      borderTopWidth={mealIndex === 0 ? 0 : 1}
      borderTopColor="gray.200"
    >
      <StatsLayout
        nameElement={
          <Input
            {...nameRegister}
            onChange={onNameChange}
            autoComplete="off"
            height={12}
            bg="white"
            borderColor="gray.200"
            width="90%"
            defaultValue={mealField.name}
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
          <Center height="100%">
            <Menu
              arrow
              align="end"
              viewScroll="close"
              menuButton={
                <IconButton
                  aria-label="test"
                  icon={<MoreHorizontal color="gray" pointerEvents="none" />}
                  variant="ghost"
                />
              }
            >
              <MenuItem>Remove</MenuItem>
              <MenuItem>Cancel</MenuItem>
            </Menu>
          </Center>
        }
      />
    </Flex>
  )
}

export default Header
