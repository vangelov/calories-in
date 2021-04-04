import { Flex, Button, Input, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Diet } from 'core/types'
import { useDietStats } from 'core/dietStats'
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
}

function Header({ onDietChange, onNewDiet }: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()
  const { saveLastChange } = useUndoRedoMethods()

  function onChangeButtonClick() {
    onDietChange(anotherDiet)
  }

  function onNewButtonClick() {
    onNewDiet()
  }

  function onNameChange() {
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
      <Input type="hidden" name="formId" ref={register} />

      <Input name="name" onChange={onNameChange} ref={register} />

      <Button onClick={onChangeButtonClick}>Change</Button>
      <Button onClick={onNewButtonClick}>New</Button>

      <Text>{dietStats.protein}</Text>
    </Flex>
  )
}

export default Header
