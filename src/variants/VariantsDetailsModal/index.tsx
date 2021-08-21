import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import { getVariantsFormsExtendedStats } from 'stats'
import { VariantForm } from 'variants'
import VariantsDetailsFormProvider from './VariantsDetailsFormProvider'
import Content from './Content'
import { useFoods } from 'foods'
import { useDietForm } from 'diets'

type Props = {
  onClose: () => void
  isOpen: boolean
  initialVariantForm: VariantForm
}

function VariantsDetailsModal({ onClose, isOpen, initialVariantForm }: Props) {
  const selectInputRef = useRef<HTMLSelectElement>(null)
  const title = 'Variants Details'
  const { foodsById } = useFoods()
  const dietForm = useDietForm()
  const variantsFormsExtendedStats = getVariantsFormsExtendedStats(
    dietForm.variantsForms,
    foodsById
  )
  const { variantsFormsStatsMap } = variantsFormsExtendedStats

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={selectInputRef}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <VariantsDetailsFormProvider
        initialVariantForm={initialVariantForm}
        initialMealsStatsSum={variantsFormsStatsMap[initialVariantForm.fieldId]}
      >
        <Content
          selectInputRef={selectInputRef}
          onClose={onClose}
          title={title}
          initialVariantForm={initialVariantForm}
          variantsForms={dietForm.variantsForms}
          variantsFormsExtendedStats={variantsFormsExtendedStats}
        />
      </VariantsDetailsFormProvider>
    </Modal>
  )
}

export type { Props }

export default VariantsDetailsModal
