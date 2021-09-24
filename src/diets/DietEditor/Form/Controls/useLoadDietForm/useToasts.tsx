import { useToast, UseToastOptions } from '@chakra-ui/toast'
import { Text, Button, useDisclosure } from '@chakra-ui/react'
import { useImportToasts } from 'persistence'

const COMMON_TOAST_OPTIONS: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: 2000,
}

function useToasts() {
  const toast = useToast()
  const importToasts = useImportToasts()
  const missingFoodsModalDisclosure = useDisclosure()

  function onLearnAboutMissingFoods() {
    toast.closeAll()
    missingFoodsModalDisclosure.onOpen()
  }

  function showFileImportedWithMissingFoodsToast() {
    toast({
      ...COMMON_TOAST_OPTIONS,
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
    showFileImportedWithMissingFoodsToast,
    missingFoodsModalDisclosure,
    ...importToasts,
  }
}

export default useToasts
