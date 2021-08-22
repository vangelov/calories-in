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
import { VariantsFormsExtendedStats } from 'stats'
import useActions from './useActions'

type Props = {
  onClose: () => void
  selectInputRef: RefObject<HTMLSelectElement>
  initialVariantForm: VariantForm
  variantsForms: VariantForm[]
  variantsFormsExtendedStats: VariantsFormsExtendedStats
}

function Content({
  onClose,
  selectInputRef,
  initialVariantForm,
  variantsForms,
  variantsFormsExtendedStats,
}: Props) {
  const actions = useActions({ variantsFormsExtendedStats })

  return (
    <ModalContent>
      <ModalHeader>Variants Details</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form>
          <FormFields
            variantStats={actions.variantStats}
            initialVariantForm={initialVariantForm}
            selectInputRef={selectInputRef}
            canEdit={false}
            variantsForms={variantsForms}
            onVariantFormFieldIdChange={actions.onVariantFormFieldIdChange}
          />
        </form>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export type { Props }

export default Content
