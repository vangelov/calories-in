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
import { useFormContext } from 'react-hook-form'
import { getVariantsDetailsForm } from '../variantsDetailsForm'

type Props = {
  onClose: () => void
  title: string
  selectInputRef: RefObject<HTMLSelectElement>
  initialVariantForm: VariantForm
  variantsForms: VariantForm[]
  variantsFormsExtendedStats: VariantsFormsExtendedStats
}

function Content({
  onClose,
  selectInputRef,
  title,
  initialVariantForm,
  variantsForms,
  variantsFormsExtendedStats,
}: Props) {
  const { reset } = useFormContext()

  function onVariantFormFieldIdChange(value: string) {
    if (!value) {
      const variantStats = variantsFormsExtendedStats.avgVariantsFormsStats
      const defaults = getVariantsDetailsForm(undefined, variantStats)

      reset(defaults)
    } else {
      const variantForm = variantsForms.find(({ fieldId }) => fieldId === value)

      if (variantForm) {
        const variantStats =
          variantsFormsExtendedStats.variantsFormsStatsMap[variantForm.fieldId]
        const defaults = getVariantsDetailsForm(
          variantForm.fieldId,
          variantStats
        )

        reset(defaults)
      }
    }
  }

  return (
    <ModalContent>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <form>
          <FormFields
            initialVariantForm={initialVariantForm}
            selectInputRef={selectInputRef}
            canEdit={false}
            variantsForms={variantsForms}
            variantsFormsExtendedStats={variantsFormsExtendedStats}
            onVariantFormFieldIdChange={onVariantFormFieldIdChange}
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
