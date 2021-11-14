import { useDietForm, useDietFormActions } from 'diets'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

function Name() {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    dietFormActions.updateDietForm({ name: value })
  }

  return (
    <Editable size="sm" textAlign="center" value={dietForm.name} width="100%">
      <EditablePreview width="100%" />
      <EditableInput onChange={onNameChange} />
    </Editable>
  )
}

export default Name
