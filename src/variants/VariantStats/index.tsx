import {
  VStack,
  BoxProps,
  Divider,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import { useDietForm } from 'diets'
import {
  getFatEnergyEstimate,
  getMacroEnergyPercent,
  getStatsEnergiesEstimates,
  useVariantStats,
} from 'stats'
import VariantStat from './VariantStat'
import EnergyStat from './EnergyStat'
import { VariantsDetailsModal } from 'variants'

type Props = {} & BoxProps

function VariantStats({ ...rest }: Props) {
  const dietForm = useDietForm()
  const { variantsForms, selectedVariantFormIndex } = dietForm
  const selectedVariantForm = variantsForms[selectedVariantFormIndex]
  const variantsDetailsModalDisclosure = useDisclosure()

  const {
    variantStats,
    proteinPercent,
    carbsPercent,
    fatPercent,
    energyDiff,
  } = useVariantStats({ variantFormFieldId: selectedVariantForm.fieldId })

  const { saturatedFat } = variantStats
  const saturatedFatEnergyEstimate = getFatEnergyEstimate(saturatedFat)
  const { energyEstimate } = getStatsEnergiesEstimates(variantStats)
  const saturatedFatPercent = Math.round(
    getMacroEnergyPercent(saturatedFatEnergyEstimate, energyEstimate)
  )

  const hasAtLeastOneMeal = selectedVariantForm.mealsForms.length > 0

  return (
    <VStack
      p={5}
      spacing={3}
      align="stretch"
      alignSelf="flex-start"
      justify="left"
      {...rest}
    >
      <Text fontSize="lg" textAlign="center" textColor="gray.500">
        Day totals
      </Text>
      <Divider />
      <EnergyStat
        energy={variantStats.energy}
        energyDiff={energyDiff}
        hasAtLeastOneMeal={hasAtLeastOneMeal}
      />

      <VariantStat
        label="Protein"
        detail={`${proteinPercent}%`}
        value={variantStats.protein}
        type="primaryMacro"
        isDisabled={!hasAtLeastOneMeal}
        tooltipLabel="% calories from protein"
      />
      <VariantStat
        label="Carbs"
        detail={`${carbsPercent}%`}
        value={variantStats.carbs}
        type="primaryMacro"
        isDisabled={!hasAtLeastOneMeal}
        tooltipLabel="% calories from carbs"
      />
      <VariantStat
        label="Fat"
        detail={`${fatPercent}%`}
        value={variantStats.fat}
        type="primaryMacro"
        isDisabled={!hasAtLeastOneMeal}
        tooltipLabel="% calories from fat"
      />

      <VariantStat
        label="Saturated fat"
        detail={`${saturatedFatPercent}%`}
        value={variantStats.saturatedFat}
        type="secondaryMacro"
        isDisabled={!hasAtLeastOneMeal}
        tooltipLabel="% calories from saturated fat"
      />
      <VariantStat
        label="Sugar"
        value={variantStats.sugar}
        type="secondaryMacro"
        isDisabled={!hasAtLeastOneMeal}
      />

      <Divider />

      <Button
        colorScheme="teal"
        variant="link"
        isDisabled={!hasAtLeastOneMeal}
        onClick={variantsDetailsModalDisclosure.onOpen}
      >
        View Details
      </Button>

      <VariantsDetailsModal
        isOpen={variantsDetailsModalDisclosure.isOpen}
        onClose={variantsDetailsModalDisclosure.onClose}
        initialVariantForm={selectedVariantForm}
      />
    </VStack>
  )
}

export default VariantStats
