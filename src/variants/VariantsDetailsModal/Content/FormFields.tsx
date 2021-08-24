import { Box, FlexProps, VStack, Select } from '@chakra-ui/react'
import { RefObject, ChangeEvent, useMemo } from 'react'
import {
  getMacrosPercents,
  roundMacrosPercents,
  Stats,
  StatsFormFields,
} from 'stats'
import { VariantForm } from 'variants'
import { Stat } from 'stats'
import { Flex } from '@chakra-ui/react'
import { useScreenSize } from 'general'

type Props = {
  selectInputRef: RefObject<HTMLSelectElement>
  canEdit: boolean
  initialVariantForm: VariantForm
  variantsForms: VariantForm[]
  variantStats: Stats
  onVariantFormFieldIdChange: (value: string) => void
} & FlexProps

function FormFields({
  selectInputRef,
  canEdit,
  variantsForms,
  initialVariantForm,
  variantStats,
  onVariantFormFieldIdChange,
  ...rest
}: Props) {
  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    onVariantFormFieldIdChange(value)
  }

  const { proteinPercent, carbsPercent, fatPercent } = useMemo(
    () => roundMacrosPercents(getMacrosPercents(variantStats)),
    [variantStats]
  )

  const screenSize = useScreenSize()
  const isLarge = screenSize >= 2

  return (
    <Box {...rest} p={4}>
      <VStack spacing={6} alignItems="stretch">
        {variantsForms.length > 1 && (
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
        )}

        <Flex width="97%" justifyContent="space-between">
          <Flex alignItems="stretch">
            <Stat
              type="dietEnergy"
              label="Energy"
              value={variantStats.energy}
              isLarge={isLarge}
              justifyContent="flex-start"
            />
          </Flex>

          <Flex width="70%" justifyContent="space-between">
            <Stat
              type="diet"
              label="Protein"
              value={variantStats.protein}
              valueDetail={`${proteinPercent}%`}
              showsValueDetail={true}
              isLarge={isLarge}
              justifyContent="flex-start"
            />

            <Stat
              justifyContent="flex-start"
              type="diet"
              label="Carbs"
              value={variantStats.carbs}
              valueDetail={`${carbsPercent}%`}
              showsValueDetail={true}
              isLarge={isLarge}
            />

            <Stat
              justifyContent="flex-start"
              type="diet"
              label="Fat"
              value={variantStats.fat}
              valueDetail={`${fatPercent}%`}
              showsValueDetail={true}
              isLarge={isLarge}
            />
          </Flex>
        </Flex>

        <StatsFormFields canEdit={canEdit} showsEnergyPrecentFromFat={true} />
      </VStack>
    </Box>
  )
}

export default FormFields
