import { Box, FlexProps, VStack, Select } from '@chakra-ui/react'
import { RefObject, ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import { StatsFormFields, VariantsFormsExtendedStats } from 'stats'
import { VariantForm } from 'variants/variant-form'

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
  HStack,
} from '@chakra-ui/react'

type Props = {
  selectInputRef: RefObject<HTMLSelectElement>
  canEdit: boolean
  initialVariantForm: VariantForm
  variantsForms: VariantForm[]
  variantsFormsExtendedStats: VariantsFormsExtendedStats
  onVariantFormFieldIdChange: (value: string) => void
} & FlexProps

function FormFields({
  selectInputRef,
  canEdit,
  variantsForms,
  initialVariantForm,
  variantsFormsExtendedStats,
  onVariantFormFieldIdChange,
  ...rest
}: Props) {
  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    onVariantFormFieldIdChange(value)
  }

  return (
    <Box {...rest} p={4}>
      <VStack spacing={6} alignItems="stretch">
        <Select
          focusBorderColor="teal.500"
          size="md"
          defaultValue={initialVariantForm.fieldId}
          onChange={onSelectChange}
          ref={selectInputRef}
        >
          <option key="avg" value={''}>
            Average for all variants
          </option>
          {variantsForms.map(variantForm => (
            <option key={variantForm.fieldId} value={variantForm.fieldId}>
              {variantForm.name}
            </option>
          ))}
        </Select>

        <Flex justifyContent="space-between">
          <Stat>
            <StatLabel>Energy</StatLabel>
            <StatNumber fontSize="lg" fontWeight="bold">
              2900kcal
            </StatNumber>
          </Stat>

          <HStack spacing={8}>
            <Stat flex={undefined}>
              <StatLabel>Protein</StatLabel>
              <StatNumber fontSize="lg">190g</StatNumber>
              <StatHelpText mb={0}>40%</StatHelpText>
            </Stat>
            <Stat flex={undefined}>
              <StatLabel>Carbs</StatLabel>
              <StatNumber fontSize="lg">160g</StatNumber>
              <StatHelpText mb={0}>40%</StatHelpText>
            </Stat>
            <Stat flex={undefined}>
              <StatLabel>Carbs</StatLabel>
              <StatNumber fontSize="lg">160g</StatNumber>
              <StatHelpText mb={0}>40%</StatHelpText>
            </Stat>
          </HStack>
        </Flex>

        <StatsFormFields canEdit={canEdit} />
      </VStack>
    </Box>
  )
}

export default FormFields
