import { Input, IconButton, Tooltip, HStack, chakra } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'
import { List } from 'react-feather'
import { useEffect, useRef } from 'react'
import { useMergeRefs } from '@chakra-ui/react'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'

const ListStyled = chakra(List)

type Props = {
  onSelectDiet: () => void
}

function Name({ onSelectDiet }: Props) {
  const { register } = useFormContext()
  const { saveLastChange } = useUndoRedoMethods()
  const nameRegister = register('name')
  const nameInputRef = useRef<HTMLInputElement>(null)
  const oneTimeCheck = useOneTimeCheck()

  function onNameChange(event: any) {
    nameRegister.onChange(event)
    saveLastChange()
  }

  const finalNameInputRef = useMergeRefs(nameInputRef, nameRegister.ref)

  useEffect(() => {
    if (oneTimeCheck.checkAndReset('name') && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [oneTimeCheck])

  return (
    <HStack height="100%" alignItems="flex-end" spacing={1}>
      <Input
        placeholder="Enter meal plan name"
        {...nameRegister}
        ref={finalNameInputRef}
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
