import { Flex, Input } from '@chakra-ui/react'
import { useDietForm, useDietFormActions } from 'diets'
import { ChangeEvent, useRef } from 'react'
import { VariantForm } from 'variants'
import VariantsMenuOrDrawer from './VariantsMenuOrDrawer'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
}

function Name({ onVariantFormSelect }: Props) {
  const dietForm = useDietForm()
  const dietFormActions = useDietFormActions()
  const variantForm = dietForm.variantsForms[dietForm.selectedVariantFormIndex]
  const inputRef = useRef<HTMLInputElement>(null)

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    dietFormActions.updateVariantForm(dietForm.selectedVariantFormIndex, {
      name: value,
    })
  }

  function onVariantFormCreate() {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Flex position="relative" height="100%" alignItems="center">
      <Input
        placeholder="Meal plan name"
        size="md"
        fontSize="lg"
        fontWeight="semibold"
        autoComplete="off"
        bg="white"
        borderBottomRightRadius={0}
        borderTopRightRadius={0}
        color="teal"
        mr="-1px"
        zIndex={1}
        position="relative"
        onChange={onNameChange}
        value={variantForm.name}
        ref={inputRef}
      />
      <VariantsMenuOrDrawer
        onVariantFormCreate={onVariantFormCreate}
        onVariantFormSelect={onVariantFormSelect}
      />
    </Flex>
  )
}

export default Name
