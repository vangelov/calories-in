import { useToast } from '@chakra-ui/toast'
import { Text, Button, useDisclosure } from '@chakra-ui/react'

function useDietImportErrors() {
  const toast = useToast()
  const missingFoodsModalDisclosure = useDisclosure()

  function onLearnAboutMissingFoods() {
    toast.closeAll()
    missingFoodsModalDisclosure.onOpen()
  }

  function onMissingFoods() {
    toast({
      isClosable: true,
      position: 'top',
      title: 'File imported',
      description: (
        <Text>
          Warning: Foods missing.{' '}
          <Button
            variant="link"
            colorScheme="white"
            onClick={onLearnAboutMissingFoods}
          >
            Learn more
          </Button>
        </Text>
      ),
      status: 'warning',
      duration: null,
    })
  }

  return {
    onMissingFoods,
    missingFoodsModalDisclosure,
  }
}

export default useDietImportErrors
