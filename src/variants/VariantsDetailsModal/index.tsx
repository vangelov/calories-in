import { Modal, ModalOverlay } from '@chakra-ui/react'
import { useRef } from 'react'
import { StatsTree } from 'stats'
import { VariantForm } from 'variants'
import VariantsDetailsFormProvider from './VariantsDetailsFormProvider'
import Content from './Content'
import { useFoods } from 'foods'
import { useDietForm, getDietFormStatsTree } from 'diets'

type Props = {
  onClose: () => void
  isOpen: boolean
  initialVariantForm: VariantForm
}

function VariantsDetailsModal({ onClose, isOpen, initialVariantForm }: Props) {
  const selectInputRef = useRef<HTMLSelectElement>(null)
  const { foodsById } = useFoods()
  const dietForm = useDietForm()
  const dietFormStatsTree = getDietFormStatsTree(dietForm, foodsById)
  const initialVariantStatsTree = dietFormStatsTree.subtrees.find(
    (statsTree: StatsTree) => statsTree.id === initialVariantForm.fieldId
  )

  if (!initialVariantStatsTree) {
    throw new Error()
  }

  return (
    <Modal
      isOpen={isOpen}
      preserveScrollBarGap={true}
      initialFocusRef={selectInputRef}
      onClose={onClose}
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay />
      <VariantsDetailsFormProvider
        initialVariantForm={initialVariantForm}
        initialVariantStats={initialVariantStatsTree.stats}
      >
        <Content
          selectInputRef={selectInputRef}
          onClose={onClose}
          initialVariantForm={initialVariantForm}
          variantsForms={dietForm.variantsForms}
          dietFormStatsTree={dietFormStatsTree}
        />
      </VariantsDetailsFormProvider>
    </Modal>
  )
}

export type { Props }

export default VariantsDetailsModal
