import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react'
import FormFields from './FormFields'
import { RefObject } from 'react'
import { VariantForm } from 'variants'
import { StatsTree } from 'stats'
import VariantsDetailsFormProvider from './VariantsDetailsFormProvider'
import { useFoods } from 'foods'
import { useDietForm, getDietFormStatsTree } from 'diets'

type Props = {
  onClose: () => void
  selectInputRef: RefObject<HTMLSelectElement>
  initialVariantForm: VariantForm
}

function Content({ onClose, selectInputRef, initialVariantForm }: Props) {
  const { foodsById } = useFoods()
  const dietForm = useDietForm()
  const { variantsForms } = dietForm

  const dietFormStatsTree = getDietFormStatsTree(dietForm, foodsById)
  const initialVariantStatsTree = dietFormStatsTree.subtrees.find(
    (statsTree: StatsTree) => statsTree.id === initialVariantForm.fieldId
  )

  if (!initialVariantStatsTree) {
    throw new Error()
  }

  return (
    <ModalContent>
      <ModalHeader>Meal Plan Details</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <VariantsDetailsFormProvider
          initialVariantForm={initialVariantForm}
          initialVariantStats={initialVariantStatsTree.stats}
        >
          <form>
            <FormFields
              initialVariantForm={initialVariantForm}
              selectInputRef={selectInputRef}
              canEdit={false}
              variantsForms={variantsForms}
              dietFormStatsTree={dietFormStatsTree}
            />
          </form>
        </VariantsDetailsFormProvider>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
