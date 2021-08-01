import { Box, Divider, FlexProps, VStack } from '@chakra-ui/react'
import { RefObject } from 'react'
import FormField from './FormField'

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  canEdit: boolean
} & FlexProps

function FoodFields({ nameInputRef, canEdit, ...rest }: Props) {
  return (
    <Box {...rest} p={4}>
      <VStack spacing={4} alignItems="stretch">
        <FormField
          textInputRef={nameInputRef}
          name="name"
          label="Name"
          inputType="text"
          isRequired={true}
          isReadOnly={!canEdit}
        />
        <FormField
          name="categoryId"
          label="Category"
          inputType="foodCategory"
          isRequired={true}
          isReadOnly={!canEdit}
        />

        <VStack spacing={2}>
          <FormField
            isCaption={true}
            isEmphasized={true}
            mt={5}
            name="servingSizeInGrams"
            label="Nutrition info per"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />
          <Divider />

          <FormField
            name="energy"
            isCaption={true}
            isValueBold={true}
            label="Energy"
            inputType="nutritionValue"
            nutritionValueUnit="kcal"
            isRequired={true}
            isReadOnly={!canEdit}
          />

          <Divider />

          <FormField
            name="fat"
            label="Fat"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />
          <FormField
            isIdented={true}
            name="saturatedFat"
            label="Saturated fat"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />

          <Divider />

          <FormField
            name="sodium"
            label="Sodium"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />

          <Divider />

          <FormField
            name="carbs"
            label="Carbs"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />
          <FormField
            isIdented={true}
            name="sugar"
            label="Sugar"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />
          <FormField
            isIdented={true}
            name="fiber"
            label="Fiber"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />

          <Divider />

          <FormField
            name="protein"
            label="Protein"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />
        </VStack>
      </VStack>
    </Box>
  )
}

export default FoodFields
