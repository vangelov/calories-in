import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react'
import FormFields from './FormFields'
import { VariantForm } from 'variants'
import { StatsTree } from 'stats'
import VariantsDetailsFormProvider from './VariantsDetailsFormProvider'
import { useDietForm, useGetDietFormStatsTree } from 'diets'

type Props = {
  onClose: () => void

  initialVariantForm: VariantForm
}

function Content({ onClose, initialVariantForm }: Props) {
  const dietForm = useDietForm()
  const { variantsForms } = dietForm

  const getDietFormStatsTree = useGetDietFormStatsTree()
  const dietFormStatsTree = getDietFormStatsTree(dietForm)
  const initialVariantStatsTree = dietFormStatsTree.subtrees.find(
    (statsTree: StatsTree) => statsTree.id === initialVariantForm.fieldId
  )

  if (!initialVariantStatsTree) {
    throw new Error()
  }

  return (
    <ModalContent>
      <ModalHeader>Day Details</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <VariantsDetailsFormProvider
          initialVariantForm={initialVariantForm}
          initialVariantStats={initialVariantStatsTree.stats}
        >
          <form>
            <FormFields
              initialVariantForm={initialVariantForm}
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
