import { Input, HStack, chakra, VStack, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useUndoRedoMethods } from 'core/undoRedo'
import { useEffect, useRef } from 'react'
import { useMergeRefs } from '@chakra-ui/react'
import { useOneTimeCheck } from 'core/OneTimeCheckProvider'
import { ArrowUpCircle, Calendar } from 'react-feather'

const ArrowUpCircleStyled = chakra(ArrowUpCircle)
const CalendarStyled = chakra(Calendar)

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
    <VStack height="100%" alignItems="flex-start" spacing={1}>
      <Input
        placeholder="Enter meal plan name"
        {...nameRegister}
        ref={finalNameInputRef}
        size="md"
        fontSize="md"
        autoComplete="off"
        onChange={onNameChange}
        bg="white"
      />

      <HStack width="100%" spacing={4}>
        <HStack spacing={1}>
          <CalendarStyled color="gray.400" size="16px" />
          <Text fontSize="xs" textColor="gray.400">
            Last edited: few days ago
          </Text>
        </HStack>

        <HStack spacing={1}>
          <ArrowUpCircleStyled color="gray.400" size="16px" />
          <Text fontSize="xs" textColor="gray.400">
            250kcal
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}

export default Name
