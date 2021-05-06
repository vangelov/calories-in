import { Input, Flex, IconButton } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { MealField, getMealsFormsPath, IngredientField } from 'core/dietForm'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useMealStats, useUpdateMealStats } from 'core/stats'
import StatsLayout from 'components/general/StatsLayout'
import StatValue from 'components/general/StatValue'
import { Menu, MenuItem } from 'components/general'
import { MoreHorizontal } from 'react-feather'
import { RefObject, useState } from 'react'
import RightAligned from 'components/general/RightAligned'
import { MenuChangeEvent } from '@szhsin/react-menu'
import { useIsMounted } from 'core/utils'
import { useMergeRefs } from '@chakra-ui/react'

type Props = {
  mealField: MealField
  ingredientsFields: IngredientField[]
  zIndex: number
  index: number
  onRemove: (index: number) => void
  getMealNameInputRefById: (id: string) => RefObject<HTMLDivElement>
}

function Header({
  mealField,
  index,
  onRemove,
  ingredientsFields,
  zIndex,
  getMealNameInputRefById,
}: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register(getMealsFormsPath(index, 'name'))
  const { mealStats } = useMealStats(index, mealField, ingredientsFields)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMountedRef = useIsMounted()
  const nameInputRef = useMergeRefs(
    nameRegister.ref,
    getMealNameInputRefById(mealField.fieldId as string)
  )

  useUpdateMealStats(index, mealStats)

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  function onMenuChange(event: MenuChangeEvent) {
    setTimeout(() => {
      if (isMountedRef.current) {
        setIsMenuOpen(event.open)
      }
    }, 0)
  }
  const amountInGrams = mealStats.amountInGrams

  return (
    <Flex
      position="sticky"
      top="0"
      bg="gray.50"
      py={4}
      px={6}
      zIndex={isMenuOpen ? 1000 : zIndex}
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray.200"
    >
      <StatsLayout
        nameElement={
          <Input
            {...nameRegister}
            ref={nameInputRef}
            placeholder="Enter meal name"
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
          <StatValue type="meal" label="Amount" value={`${amountInGrams}g`} />
        }
        energyElement={
          <StatValue
            type="mealEnergy"
            label="Energy"
            value={`${amountInGrams * 10}kcal`}
          />
        }
        proteinElement={
          <StatValue
            type="meal"
            label="Protein"
            value={`${amountInGrams * 2}g`}
          />
        }
        carbsElement={
          <StatValue
            type="meal"
            label="Carbs"
            value={`${amountInGrams * 2.5}g`}
          />
        }
        fatElement={
          <StatValue
            type="meal"
            label="Fat"
            value={`${amountInGrams * 1.5}g`}
          />
        }
        menuElement={
          <RightAligned>
            <Menu
              arrow
              align="end"
              viewScroll="close"
              onChange={onMenuChange}
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
