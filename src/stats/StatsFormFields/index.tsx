import { FlexProps, Collapse } from '@chakra-ui/react'
import { useState } from 'react'
import MacrosFormFields from './MacrosFormFields'
import VitaminsAndMineralsFormFields from './VitaminsAndMineralsFormFields'
import RevealButton from './ReavealButton'

type Props = {
  canEdit: boolean
  showsEnergyPrecentFromFat?: boolean
} & FlexProps

function StatsList({ canEdit, showsEnergyPrecentFromFat = false }: Props) {
  const [showsVitaminsAndMinerals, setShowsVitaminsAndMinerals] = useState(
    false
  )

  function onShowVitaminsAndMineralsToggle() {
    setShowsVitaminsAndMinerals(!showsVitaminsAndMinerals)
  }

  return (
    <>
      <MacrosFormFields
        canEdit={canEdit}
        showsEnergyPercentFromFats={showsEnergyPrecentFromFat}
      />

      <Collapse in={showsVitaminsAndMinerals} animateOpacity>
        <VitaminsAndMineralsFormFields canEdit={canEdit} />
      </Collapse>

      <RevealButton
        alignSelf="flex-start"
        isContentShown={showsVitaminsAndMinerals}
        onClick={onShowVitaminsAndMineralsToggle}
        showContentLabel="Show  vitamins and minerals"
        hideContentLabel="Hide  vitamins and minerals"
      />
    </>
  )
}

export { default as StatFormField } from './StatFormField'

export default StatsList
