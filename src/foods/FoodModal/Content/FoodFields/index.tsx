import { Box, FlexProps, VStack, Collapse, Divider } from '@chakra-ui/react'
import { RefObject, useState } from 'react'
import FormField from './FormField'
import Macros from './Macros'
import VitaminsAndMinerals from './VitaminsAndMinerals'
import RevealButton from './ReavealButton'

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  canEdit: boolean
} & FlexProps

function FoodFields({ nameInputRef, canEdit, ...rest }: Props) {
  const [showsVitaminsAndMinerals, setShowsVitaminsAndMinerals] = useState(
    false
  )

  function onShowVitaminsAndMineralsToggle() {
    setShowsVitaminsAndMinerals(!showsVitaminsAndMinerals)
  }

  return (
    <Box {...rest} p={4}>
      <VStack spacing={2} alignItems="stretch">
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
              isEmphasized={true}
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
              isEmphasized={true}
              label="Energy"
              inputType="nutritionValue"
              nutritionValueUnit="kcal"
              isRequired={true}
              isReadOnly={!canEdit}
            />
          </VStack>
        </VStack>

        <Macros canEdit={canEdit} />

        <Collapse in={showsVitaminsAndMinerals} animateOpacity>
          <VitaminsAndMinerals canEdit={canEdit} />
        </Collapse>

        <RevealButton
          alignSelf="flex-start"
          isContentShown={showsVitaminsAndMinerals}
          onClick={onShowVitaminsAndMineralsToggle}
          showContentLabel="Show  vitamins and minerals"
          hideContentLabel="Hide  vitamins and minerals"
        />
      </VStack>
    </Box>
  )
}

export default FoodFields
