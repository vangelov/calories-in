import { Flex, Input, IconButton } from '@chakra-ui/react'
import { useDietForm, useDietFormActions } from 'diets'
import { ChevronDown } from 'react-feather'
import { ChangeEvent } from 'react'

function Name() {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()
  const variantForm = dietForm.variantsForms[dietForm.selectedVariantFormIndex]

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    dietFormActions.updateVariantForm(dietForm.selectedVariantFormIndex, {
      name: value,
    })
  }

  return (
    <Flex position="relative" height="100%" alignItems="center">
      <Input
        placeholder="Meal plan name"
        size="md"
        fontSize="lg"
        fontWeight="semibold"
        autoComplete="off"
        textColor="gray.600"
        bg="white"
        borderBottomRightRadius={0}
        borderTopRightRadius={0}
        color="teal"
        mr="-1px"
        zIndex={1}
        position="relative"
        onChange={onNameChange}
        value={variantForm.name}
      />
      <IconButton
        borderBottomLeftRadius={0}
        borderTopLeftRadius={0}
        variant="outline"
        aria-label="test"
        icon={<ChevronDown />}
      />
    </Flex>
  )
}

export default Name
