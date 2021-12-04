import { useDietForm, useDietFormActions } from 'diets'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { getComputedColorFromChakra } from 'theme'

function Name() {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    dietFormActions.updateDietForm({ name: value })
  }

  const boxShadowColor = getComputedColorFromChakra('teal.400')

  return (
    <Editable
      fontSize="lg"
      fontWeight="medium"
      textAlign="center"
      value={dietForm.name}
      width="80%"
    >
      <EditablePreview width="100%" />
      <EditableInput
        _focus={{ boxShadow: `${boxShadowColor} 0px 0px 0px 3px` }}
        onChange={onNameChange}
      />
    </Editable>
  )
}

export default Name
