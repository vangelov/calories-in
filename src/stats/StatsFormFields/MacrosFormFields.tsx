import { Divider, VStack, Box, Collapse } from '@chakra-ui/react'
import { useState } from 'react'
import StatFormField from './StatFormField'
import styled from '@emotion/styled'
import RevealButton from './ReavealButton'

const StyledCollapse = styled(Collapse)`
  align-self: stretch;
`

type Props = {
  canEdit: boolean
  showsEnergyPercentFromFats?: boolean
}

function MacrosFormFields({
  canEdit,
  showsEnergyPercentFromFats = false,
}: Props) {
  const [showsAllFatTypes, setShowsAllFatTypes] = useState(false)

  function onShowAllFatTypesToggle() {
    setShowsAllFatTypes(!showsAllFatTypes)
  }

  return (
    <VStack spacing={2} alignItems="flex-start">
      <Divider />

      <StatFormField
        name="fat"
        label="Fat"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
      />

      <StatFormField
        isIdented={true}
        name="saturatedFat"
        label="Saturated fat"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
      />

      {showsEnergyPercentFromFats && (
        <StatFormField
          isIdented={true}
          name="saturatedFatEnergyPercent"
          label="Energy from saturated fat"
          inputType="nutritionValue"
          nutritionValueUnit="%"
          isReadOnly={!canEdit}
        />
      )}

      <StyledCollapse in={showsAllFatTypes} animateOpacity>
        <VStack spacing={2} alignItems="flex-start">
          <StatFormField
            isIdented={true}
            name="polyunsaturatedFat"
            label="Polyunsaturated fat"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
            width="100%"
          />
          <StatFormField
            isIdented={true}
            name="monounsaturatedFat"
            label="Monounsaturated fat"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
          />
        </VStack>
      </StyledCollapse>

      <Box>
        <RevealButton
          ml={10}
          isContentShown={showsAllFatTypes}
          onClick={onShowAllFatTypesToggle}
          showContentLabel="Show more fat types"
          hideContentLabel="Show less fat types"
        />
      </Box>

      <Divider />

      <StatFormField
        name="cholesterol"
        label="Cholesterol"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        nutritionValueUnit="mg"
      />

      <Divider />

      <StatFormField
        name="sodium"
        label="Sodium"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
        nutritionValueUnit="mg"
      />

      <Divider />

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
      />
      <StatFormField
        isIdented={true}
        name="fiber"
        label="Fiber"
        inputType="nutritionValue"
        isReadOnly={!canEdit}
      />

      <Divider />

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
