import { useToast } from '@chakra-ui/toast'
import { Text, Button, UseDisclosureReturn } from '@chakra-ui/react'

type Params = {
  missingFoodsModalDisclosure: UseDisclosureReturn
}

function useDietImportErrors({ missingFoodsModalDisclosure }: Params) {
  const toast = useToast()

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
