import { Flex, Heading, Button } from '@chakra-ui/react'
import { useDietForm } from 'diets'
import { ScreenSize, useScreenSize } from 'general'
import { Share } from 'react-feather'

type Props = {
  canExport: boolean
  onExport: () => void
}

function Name({ canExport, onExport }: Props) {
  const dietForm = useDietForm()
  const variantForm = dietForm.variantsForms[dietForm.selectedVariantFormIndex]
  const screenSize = useScreenSize()

  return (
    <Flex height="100%" alignItems="center">
      <Heading
        wordBreak="break-all"
        fontSize={screenSize >= ScreenSize.Medium ? '24px' : '20px'}
        color="teal.600"
      >
        {variantForm.name}
      </Heading>
      {screenSize >= ScreenSize.Medium && (
        <Button
          flexShrink={0}
          colorScheme="teal"
          size="sm"
          variant="solid"
          ml={3}
          mr={3}
          isDisabled={!canExport}
          onClick={onExport}
          leftIcon={<Share size={20} pointerEvents="none" />}
        >
          Export
        </Button>
      )}
    </Flex>
  )
}

export default Name
