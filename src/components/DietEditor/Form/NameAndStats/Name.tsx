import { Input, HStack, chakra, VStack, Text } from '@chakra-ui/react'
import { ArrowUpCircle, AlertCircle } from 'react-feather'

const ArrowUpCircleStyled = chakra(ArrowUpCircle)
const AlertCircleStyled = chakra(AlertCircle)

function Name() {
  function onNameChange(event: any) {
    //nameRegister.onChange(event)
  }

  return (
    <VStack height="100%" alignItems="flex-start" spacing={1}>
      <Input
        placeholder="Meal plan name"
        size="md"
        fontSize="md"
        autoComplete="off"
        onChange={onNameChange}
        bg="white"
      />

      <HStack display={{ base: 'none', md: 'flex' }} width="100%" spacing={4}>
        <HStack spacing={1}>
          <AlertCircleStyled color="gray.400" size="16px" />
          <Text fontSize="xs" textColor="gray.400">
            Unsaved changes
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
