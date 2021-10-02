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
import useVariantFormEvents from './useVariantFormEvents'

type Props = {
  onClose: () => void
  selectInputRef: RefObject<HTMLSelectElement>
  initialVariantForm: VariantForm
  variantsForms: VariantForm[]
  dietFormStatsTree: StatsTree
}

function Content({
  onClose,
  selectInputRef,
  initialVariantForm,
  variantsForms,
  dietFormStatsTree,
}: Props) {
  const variantFormEvents = useVariantFormEvents({ dietFormStatsTree })

  return (
    <ModalContent>
      <ModalHeader>Meal Plan Details</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form>
          <FormFields
            variantStats={variantFormEvents.variantStats}
            initialVariantForm={initialVariantForm}
            selectInputRef={selectInputRef}
            canEdit={false}
            variantsForms={variantsForms}
            onVariantFormFieldIdChange={
              variantFormEvents.onVariantFormFieldIdChange
            }
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
