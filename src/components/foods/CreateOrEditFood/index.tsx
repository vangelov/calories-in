import { Box, Divider, FlexProps, VStack, Checkbox } from '@chakra-ui/react'
import FormField from './FormField'

type Props = FlexProps

function CreateOrEditFood({ ...rest }: Props) {
  return (
    <Box {...rest} overflowY="scroll" p={4}>
      <VStack spacing={4} alignItems="stretch">
        <FormField name="name" label="Name" inputType="text" />
        <FormField
          name="categoryId"
          label="Category"
          inputType="foodCategory"
        />

        <Checkbox colorScheme="custom" size="md">
          Also add this food to my list of foods for later selection
        </Checkbox>

        <VStack spacing={2}>
          <Divider />

          <FormField
            name="servingSizeInGrams"
            label="Nutrition info per"
            inputType="nutritionValue"
          />
          <Divider />

          <FormField
            name="energy"
            label="Energy"
            inputType="nutritionValue"
            nutritionValueUnit="kcal"
          />

          <Divider />

          <FormField name="fat" label="Fat" inputType="nutritionValue" />
          <FormField
            isIdented={true}
            name="saturatedFat"
            label="Saturated fat"
            inputType="nutritionValue"
          />

          <Divider />

          <FormField name="carbs" label="Carbs" inputType="nutritionValue" />
          <FormField
            isIdented={true}
            name="sugar"
            label="Sugar"
            inputType="nutritionValue"
          />
          <FormField
            isIdented={true}
            name="fiber"
            label="Fiber"
            inputType="nutritionValue"
          />

          <Divider />

          <FormField
            name="protein"
            label="Protein"
            inputType="nutritionValue"
          />
        </VStack>
      </VStack>
    </Box>
  )
}

export default CreateOrEditFood
