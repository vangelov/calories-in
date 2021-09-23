import { useToast, UseToastOptions } from '@chakra-ui/toast'
import { Text, Button, useDisclosure } from '@chakra-ui/react'

const COMMON_TOAST_OPTIONS: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: 2000,
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

  function showCouldNotLoadFileToast(file: File) {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: `File ${file.name} could not be loaded`,
      status: 'error',
      duration: null,
    })
  }

  function showCouldNotParseFileToast(file: File) {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: `File ${file.name} does is not a meal plan`,
      status: 'error',
      duration: null,
    })
  }

  function showGeneralError(error: any) {
    const { message } = error
    const prefix = 'Something went wrong'

    toast({
      ...COMMON_TOAST_OPTIONS,
      title: message ? `${prefix}: ${message}` : prefix,
      status: 'error',
      duration: null,
    })
  }

  return {
    showFileImportedToast,
    showCouldNotLoadFileToast,
    showCouldNotParseFileToast,
    showFileImportedWithMissingFoodsToast,
    missingFoodsModalDisclosure,
    showGeneralError,
  }
}

export default useToasts
