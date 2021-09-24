import { useToast, UseToastOptions } from '@chakra-ui/toast'

const COMMON_TOAST_OPTIONS: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: 2000,
}

function useImportToasts() {
  const toast = useToast()

  function showFileImportedToast() {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: 'File imported',
      status: 'success',
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
      title: `File ${file.name} could not be imported`,
      status: 'error',
      duration: null,
    })
  }

  function showErrorToast(error: any) {
    const { message } = error

    toast({
      ...COMMON_TOAST_OPTIONS,
      title: 'Something went wrong',
      description: message,
      status: 'error',
      duration: null,
    })
  }

  return {
    showFileImportedToast,
    showCouldNotLoadFileToast,
    showCouldNotParseFileToast,
    showErrorToast,
  }
}

export default useImportToasts
