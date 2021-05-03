import { Flex, Input } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Diet } from 'core/types'
import { useDietStats } from 'core/stats'
import { useUndoRedoMethods } from 'core/undoRedo'
import StatsLayout from 'components/general/StatsLayout'
import StatValue from 'components/general/StatValue'

type Props = {
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
}

/*const anotherDiet: Diet = {
  id: 2,
  name: 'Another',
  meals: [
    {
      name: 'Meal A',
      ingredients: [{ amountInGrams: 200, foodId: 2 }],
    },
    { name: 'Meal B', ingredients: [{ amountInGrams: 200, foodId: 2 }] },
  ],
  foodsByIdMap: {
    '2': { id: 2, name: 'food2', categoryId: 1 },
  },
}*/

function Header({ onDietChange, onNewDiet }: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register('name')

  /*function onChangeButtonClick() {
    onDietChange(anotherDiet)
  }

  function onNewButtonClick() {
    onNewDiet()
  }*/

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  const amountInGrams = dietStats.amountInGrams

  return (
    <Flex
      padding={2}
      height="90px"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="white"
    >
      <Input type="hidden" {...register('formId')} />

      <StatsLayout
        nameElement={<Input {...nameRegister} onChange={onNameChange} />}
        energyElement={
          <StatValue
            isBold={true}
            label="Energy"
            color="gray.500"
            value={`${amountInGrams * 10}kcal`}
          />
        }
        proteinElement={
          <StatValue
            isBold={true}
            label="Protein"
            color="gray.500"
            value={`${amountInGrams * 2}g`}
          />
        }
        carbsElement={
          <StatValue
            isBold={true}
            label="Carbs"
            color="gray.500"
            value={`${amountInGrams * 2.5}g`}
          />
        }
        fatElement={
          <StatValue
            isBold={true}
            label="Fat"
            color="gray.500"
            value={`${amountInGrams * 1.5}g`}
          />
        }
        menuElement={<div />}
      />
    </Flex>
  )
}

export default Header
