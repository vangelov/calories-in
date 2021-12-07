import { Box, FlexProps, VStack } from '@chakra-ui/react'
import { RefObject } from 'react'
import { StatsFormFields, StatFormField } from 'stats'

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  canEdit: boolean
} & FlexProps

function NutritionFactsFormFields({ nameInputRef, canEdit, ...rest }: Props) {
  return (
    <Box {...rest}>
      <VStack spacing={2} alignItems="stretch">
        <VStack spacing={2}>
          <StatFormField
            hasDivider={false}
            isEmphasized={true}
            name="servingSizeInGrams"
            label="Serving size"
            isRequired={true}
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />

          <StatFormField
            name="energy"
            isCaption={true}
            isValueBold={true}
            isEmphasized={true}
            label="Calories"
            inputType="nutritionValue"
            nutritionValueUnit="kcal"
            isRequired={true}
            isReadOnly={!canEdit}
          />
        </VStack>

        <StatsFormFields canEdit={canEdit} />
      </VStack>
    </Box>
  )
}

export default NutritionFactsFormFields
