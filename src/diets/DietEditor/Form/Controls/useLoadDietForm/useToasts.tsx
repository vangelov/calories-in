import { useToast, UseToastOptions } from '@chakra-ui/toast'
import { Text, Button, useDisclosure } from '@chakra-ui/react'

const COMMON_TOAST_OPTIONS: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: 2500,
}

function useToasts() {
  const toast = useToast()
  const missingFoodsModalDisclosure = useDisclosure()

  function onLearnAboutMissingFoods() {
    toast.closeAll()
    missingFoodsModalDisclosure.onOpen()
  }

  function showFileImportedToast() {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: 'File imported',
      status: 'success',
    })
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

  function showCouldNotLoadFileToast() {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: 'Could not load file',
      status: 'error',
    })
  }

  function showCouldNotParseFileToast() {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: 'Could not parse file data',
      status: 'error',
    })
  }

  return {
    showFileImportedToast,
    showCouldNotLoadFileToast,
    showCouldNotParseFileToast,
    showFileImportedWithMissingFoodsToast,
    missingFoodsModalDisclosure,
  }
}

export default useToasts
