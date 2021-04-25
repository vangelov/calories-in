import { Flex, Button, Input, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Diet } from 'core/types'
import { useDietStats } from 'core/stats'
import { useUndoRedoMethods } from 'core/undoRedo'

type Props = {
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
}

const anotherDiet: Diet = {
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
}

function Header({ onDietChange, onNewDiet }: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register('name')

  function onChangeButtonClick() {
    onDietChange(anotherDiet)
  }

  function onNewButtonClick() {
    onNewDiet()
  }

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  return (
    <Flex
      padding={2}
      height="90px"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="brown"
    >
      <Input type="hidden" {...register('formId')} />
      <Input {...nameRegister} onChange={onNameChange} />

      <Button onClick={onChangeButtonClick}>Change</Button>
      <Button onClick={onNewButtonClick}>New</Button>

      <Text>{dietStats.protein}</Text>
    </Flex>
  )
}

export default Header
