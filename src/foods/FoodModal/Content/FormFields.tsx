import { Box, FlexProps, VStack } from '@chakra-ui/react'
import { RefObject } from 'react'
import { StatsFormFields, StatFormField } from 'stats'

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  canEdit: boolean
} & FlexProps

function FormFields({ nameInputRef, canEdit, ...rest }: Props) {
  return (
    <Box {...rest} p={4}>
      <VStack spacing={2} alignItems="stretch">
        <VStack spacing={4} alignItems="stretch">
          <StatFormField
            textInputRef={nameInputRef}
            name="name"
            label="Name"
            inputType="text"
            isRequired={true}
            isReadOnly={!canEdit}
            hasDivider={false}
          />
          <StatFormField
            name="categoryId"
            label="Category"
            inputType="foodCategory"
            isRequired={true}
            isReadOnly={!canEdit}
          />

          <VStack spacing={2}>
            <StatFormField
              isEmphasized={true}
              name="servingSizeInGrams"
              label="Nutrition info per"
              inputType="nutritionValue"
              isReadOnly={!canEdit}
            />

            <StatFormField
              name="energy"
              isCaption={true}
              isValueBold={true}
              isEmphasized={true}
              label="Energy"
              inputType="nutritionValue"
              nutritionValueUnit="kcal"
              isRequired={true}
              isReadOnly={!canEdit}
            />
          </VStack>
        </VStack>

        <StatsFormFields canEdit={canEdit} />
      </VStack>
    </Box>
  )
}

export default FormFields
