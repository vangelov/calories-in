import { Input, IconButton, Tooltip, HStack, chakra } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'
import { List } from 'react-feather'

const ListStyled = chakra(List)

type Props = {
  onSelectDiet: () => void
}

function Name({ onSelectDiet }: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register('name')

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  return (
    <HStack height="100%" alignItems="flex-end" spacing={1}>
      <Input
        {...nameRegister}
        fontSize="lg"
        textColor="gray.600"
        autoComplete="off"
        onChange={onNameChange}
      />

      <Tooltip hasArrow label="Browse" aria-label="Browse tooltip">
        <IconButton
          variant="outline"
          aria-label="test"
          onClick={onSelectDiet}
          icon={<ListStyled color="gray.400" pointerEvents="none" />}
        />
      </Tooltip>
    </HStack>
  )
}

export default Name
