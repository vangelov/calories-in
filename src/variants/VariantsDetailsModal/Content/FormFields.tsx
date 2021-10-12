import { Box, FlexProps, VStack, Select } from '@chakra-ui/react'
import { RefObject, ChangeEvent, useMemo } from 'react'
import {
  getMacrosPercents,
  roundMacrosPercents,
  Stats,
  StatsFormFields,
  StatValueDetail,
  Stat,
} from 'stats'
import { VariantForm } from 'variants'
import { Flex } from '@chakra-ui/react'
import { useScreenSize, ScreenSize } from 'general'

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
  const isLarge = screenSize >= ScreenSize.Medium

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
              Average across all days
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
              isLarge={isLarge}
              justifyContent="flex-start"
              valueDetailElement={
                <StatValueDetail
                  label={`${proteinPercent}%`}
                  tooltipLabel={'% energy from protein'}
                />
              }
            />

            <Stat
              justifyContent="flex-start"
              type="diet"
              label="Carbs"
              value={variantStats.carbs}
              isLarge={isLarge}
              valueDetailElement={
                <StatValueDetail
                  label={`${carbsPercent}%`}
                  tooltipLabel={'% energy from carbs'}
                />
              }
            />

            <Stat
              justifyContent="flex-start"
              type="diet"
              label="Fat"
              value={variantStats.fat}
              isLarge={isLarge}
              valueDetailElement={
                <StatValueDetail
                  label={`${fatPercent}%`}
                  tooltipLabel={'% energy from fats'}
                />
              }
            />
          </Flex>
        </Flex>

        <StatsFormFields canEdit={canEdit} showsEnergyPrecentFromFat={true} />
      </VStack>
    </Box>
  )
}

export default FormFields
