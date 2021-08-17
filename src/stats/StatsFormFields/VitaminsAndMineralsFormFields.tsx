import { VStack, Divider } from '@chakra-ui/layout'
import StatFormField from './StatFormField'

type Props = {
  canEdit: boolean
}

function VitaminsAndMinerals({ canEdit }: Props) {
  return (
    <VStack spacing={2} alignItems="flex-start">
      <Divider borderBottomWidth="8px" />
      <StatFormField
        name="vitaminA"
        label="Vitamin A"
        inputType="nutritionValue"
        nutritionValueUnit="mcg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB1"
        label="Vitamin B1"
        labelDetail="(thiamine)"
        inputType="nutritionValue"
        nutritionValueUnit="mcg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB2"
        label="Vitamin B2"
        labelDetail="(riboflavin)"
        inputType="nutritionValue"
        nutritionValueUnit="mg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB3"
        label="Vitamin B3"
        labelDetail="(niacin)"
        inputType="nutritionValue"
        nutritionValueUnit="mg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB5"
        label="Vitamin B5"
        labelDetail="(pantothenic acid)"
        inputType="nutritionValue"
        nutritionValueUnit="mg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB6"
        label="Vitamin B6"
        inputType="nutritionValue"
        nutritionValueUnit="mg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB9"
        label="Vitamin B9"
        labelDetail="(folate)"
        inputType="nutritionValue"
        nutritionValueUnit="mcg"
        isReadOnly={!canEdit}
      />

      <Divider />

      <StatFormField
        name="vitaminB12"
        label="Vitamin B12"
        inputType="nutritionValue"
        nutritionValueUnit="mcg"
        isReadOnly={!canEdit}
      />
    </VStack>
  )
}

export default VitaminsAndMinerals
