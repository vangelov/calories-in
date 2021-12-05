import { VStack } from '@chakra-ui/react'
import StatFormField from './StatFormField'
import useGetDailyValuePercent from './useGetDailyValuePercent'

type Props = {
  canEdit: boolean
  showsEnergyPercentFromFats?: boolean
}

function MacrosFormFields({
  canEdit,
  showsEnergyPercentFromFats = false,
}: Props) {
  const getDailyValuePercent = useGetDailyValuePercent()

  return (
    <VStack spacing={2} alignItems="flex-start">
      <StatFormField
        name="fat"
        label="Fat"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        dailyValuePercent={getDailyValuePercent('fat')}
      />

      <StatFormField
        isIdented={true}
        name="saturatedFat"
        label="Saturated fat"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        dailyValuePercent={getDailyValuePercent('saturatedFat')}
      />

      {showsEnergyPercentFromFats && (
        <StatFormField
          ml={3}
          isIdented={true}
          name="saturatedFatEnergyPercent"
          label="Calories from saturated fat"
          inputType="nutritionValue"
          nutritionValueUnit="%"
          isReadOnly={!canEdit}
        />
      )}

      <StatFormField
        isIdented={true}
        name="polyunsaturatedFat"
        label="Polyunsaturated fat"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        width="100%"
        dailyValuePercent={getDailyValuePercent('polyunsaturatedFat')}
      />
      <StatFormField
        isIdented={true}
        name="monounsaturatedFat"
        label="Monounsaturated fat"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        dailyValuePercent={getDailyValuePercent('monounsaturatedFat')}
      />

      <StatFormField
        name="cholesterol"
        label="Cholesterol"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        nutritionValueUnit="mg"
        dailyValuePercent={getDailyValuePercent('cholesterol')}
      />

      <StatFormField
        name="sodium"
        label="Sodium"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        nutritionValueUnit="mg"
        dailyValuePercent={getDailyValuePercent('sodium')}
      />

      <StatFormField
        name="carbs"
        label="Carbs"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
      />
      <StatFormField
        isIdented={true}
        name="sugar"
        label="Sugar"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        dailyValuePercent={getDailyValuePercent('sugar')}
      />
      <StatFormField
        isIdented={true}
        name="fiber"
        label="Fiber"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        dailyValuePercent={getDailyValuePercent('fiber')}
      />

      <StatFormField
        name="protein"
        label="Protein"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
      />
    </VStack>
  )
}

export default MacrosFormFields
