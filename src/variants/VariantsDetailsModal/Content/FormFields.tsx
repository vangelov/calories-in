import { Box, FlexProps, VStack, Select } from '@chakra-ui/react'
import { ChangeEvent, useMemo } from 'react'
import {
  getMacrosPercents,
  roundMacrosPercents,
  StatsFormFields,
  StatValueDetail,
  Stat,
  StatsTree,
} from 'stats'
import { VariantForm } from 'variants'
import { Flex } from '@chakra-ui/react'
import { useScreenSize, ScreenSize } from 'general'
import useVariantFormEvents from './useVariantFormEvents'

type Props = {
  canEdit: boolean
  initialVariantForm: VariantForm
  variantsForms: VariantForm[]

  dietFormStatsTree: StatsTree
} & FlexProps

function FormFields({
  canEdit,
  variantsForms,
  initialVariantForm,

  dietFormStatsTree,
  ...rest
}: Props) {
  const variantFormEvents = useVariantFormEvents({ dietFormStatsTree })
  const { variantStats } = variantFormEvents
  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target
    variantFormEvents.onVariantFormFieldIdChange(value)
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
          <Box>
            <Stat
              type="dietEnergy"
              label="Calories"
              value={variantStats.energy}
              isLarge={isLarge}
              justifyContent="flex-start"
            />
          </Box>

          <Box>
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
          </Box>

          <Box>
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
          </Box>

          <Box>
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
          </Box>
        </Flex>

        <StatsFormFields canEdit={canEdit} showsEnergyPrecentFromFat={true} />
      </VStack>
    </Box>
  )
}

export default FormFields
