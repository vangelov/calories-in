import { FlexProps, Collapse, Text, Flex, Box, Divider } from '@chakra-ui/react'
import { useState } from 'react'
import MacrosFormFields from './MacrosFormFields'
import VitaminsAndMineralsFormFields from './VitaminsAndMineralsFormFields'
import RevealButton from './ReavealButton'

type Props = {
  canEdit: boolean
  showsEnergyPrecentFromFat?: boolean
} & FlexProps

function StatsFormFields({
  canEdit,
  showsEnergyPrecentFromFat = false,
}: Props) {
  const [showsVitaminsAndMinerals, setShowsVitaminsAndMinerals] = useState(
    false
  )

  function onShowVitaminsAndMineralsToggle() {
    setShowsVitaminsAndMinerals(!showsVitaminsAndMinerals)
  }

  return (
    <Box>
      {!canEdit && (
        <>
          <Divider borderBottomWidth="8px" />
          <Flex justifyContent="flex-end" py={2}>
            <Text fontWeight="medium">% Daily Value *</Text>
          </Flex>
        </>
      )}

      <MacrosFormFields
        canEdit={canEdit}
        showsEnergyPercentFromFats={showsEnergyPrecentFromFat}
      />

      <Collapse in={showsVitaminsAndMinerals} animateOpacity>
        <VitaminsAndMineralsFormFields canEdit={canEdit} />
      </Collapse>

      <RevealButton
        mt={2}
        alignSelf="flex-start"
        isContentShown={showsVitaminsAndMinerals}
        onClick={onShowVitaminsAndMineralsToggle}
        showContentLabel="Show  vitamins and minerals"
        hideContentLabel="Hide  vitamins and minerals"
      />
    </Box>
  )
}

export { default as StatFormField } from './StatFormField'

export default StatsFormFields
