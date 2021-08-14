import { Divider, VStack, Box, Collapse } from '@chakra-ui/react'
import { useState } from 'react'
import FormField from './FormField'
import styled from '@emotion/styled'
import RevealButton from './ReavealButton'

const StyledCollapse = styled(Collapse)`
  align-self: stretch;
`

type Props = {
  canEdit: boolean
}
function Macros({ canEdit }: Props) {
  const [showsAllFatTypes, setShowsAllFatTypes] = useState(false)

  function onShowAllFatTypesToggle() {
    setShowsAllFatTypes(!showsAllFatTypes)
  }

  return (
    <VStack spacing={2} alignItems="flex-start">
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

      <StyledCollapse in={showsAllFatTypes} animateOpacity>
        <VStack spacing={2} alignItems="flex-start">
          <FormField
            isIdented={true}
            name="saturatedFat"
            label="Saturated fat"
            inputType="nutritionValue"
            isReadOnly={!canEdit}
            width="100%"
          />
          <FormField
            isIdented={true}
            name="saturatedFat"
            label="Saturated fat"
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
  )
}

export default Macros
