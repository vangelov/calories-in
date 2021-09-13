import { useToast, UseToastOptions } from '@chakra-ui/toast'

const COMMON_TOAST_OPTIONS: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: 2500,
}

function useToasts() {
  const toast = useToast()

  function showFileImportedToast() {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: 'File imported',
      status: 'success',
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
  }
}

export default useToasts
