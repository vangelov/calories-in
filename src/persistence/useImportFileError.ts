import { useToast, UseToastOptions } from '@chakra-ui/toast'

const COMMON_TOAST_OPTIONS: UseToastOptions = {
  isClosable: true,
  position: 'top',
  duration: null,
  status: 'error',
}

type OnErrorParams = {
  file: File
  error: any
}

function useFileImportError() {
  const toast = useToast()

  function showCouldNotLoadFileToast(file: File) {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: `File ${file.name} could not be loaded`,
    })
  }

  function showCouldNotParseFileToast(file: File) {
    toast({
      ...COMMON_TOAST_OPTIONS,
      title: `File ${file.name} contains invalid data`,
    })
  }

  function showErrorToast(file: File, error: any) {
    const { message } = error

    toast({
      ...COMMON_TOAST_OPTIONS,
      title: `File ${file.name} could not be imported`,
      description: message,
    })
  }

  function onError({ error, file }: OnErrorParams) {
    if (error instanceof DOMException) {
      showCouldNotLoadFileToast(file)
    } else if (error instanceof SyntaxError) {
      showCouldNotParseFileToast(file)
    } else {
      showErrorToast(file, error)
    }
  }

  return {
    onError,
  }
}

export default useFileImportError
