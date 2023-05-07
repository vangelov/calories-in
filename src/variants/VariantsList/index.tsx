import { Flex, useDisclosure } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Droppable } from 'react-beautiful-dnd'
import VariantNameModal from './VariantNameModal'
import { ForwardedRef, createRef, forwardRef, useRef } from 'react'
import { useDietForm } from 'diets'
import { VariantForm, VariantsDetailsModal } from 'variants'
import { HFadeScroll, useScreenSize, ScreenSize } from 'general'
import mergeRefs from 'react-merge-refs'
import ScrollButtons from './ScrollButtons'
import VariantsMenuOrDrawer from './VariantsMenuOrDrawer'
import { useGetRefForId } from 'dom'
import useScrollState from './useScrollState'
import useVariantFormEvents from './useVariantFormEvents'
import AddVariantButton from './AddVariantButton'

type Props = {
  onVariantFormSelect: (variantForm: VariantForm, index: number) => void
  onVariantFormCopy: () => void
  forwardedRef?: ForwardedRef<HTMLDivElement>
}
function VariantsList({
  onVariantFormSelect,
  onVariantFormCopy,
  forwardedRef = createRef(),
}: Props) {
  const scrollNodeRef = useRef<HTMLDivElement>(null)
  const screenSize = useScreenSize()
  const isPhone = screenSize <= ScreenSize.Small

  const nameModalDisclosure = useDisclosure()
  const detailsModalDisclosure = useDisclosure()

  const variantFormEvents = useVariantFormEvents({
    onVariantFormSelect,
    onVariantFormCopy,
    nameModalDisclosure,
    detailsModalDisclosure,
  })

  const dietForm = useDietForm()
  const getVariantItemRefById = useGetRefForId<HTMLDivElement>()
  const scrollState = useScrollState()

  return (
    <Flex py={6}>
      <AddVariantButton onClick={variantFormEvents.onAppend} />

      {!isPhone && (
        <VariantsMenuOrDrawer onVariantFormSelect={onVariantFormSelect} />
      )}

      <Droppable
        droppableId="variantsList"
        type="variantsList"
        direction="horizontal"
      >
        {provided => (
          <HFadeScroll
            onScrollStateChange={scrollState.onScrollStateChange}
            ref={mergeRefs([provided.innerRef, scrollNodeRef, forwardedRef])}
          >
            {dietForm.variantsForms.map((variantForm, index) => {
              return (
                <VariantItem
                  data-test-type="variant"
                  data-test-index={index}
                  canRemove={dietForm.variantsForms.length > 1}
                  index={index}
                  onDelete={variantFormEvents.onRemove}
                  onEditName={variantFormEvents.onRename}
                  onClone={variantFormEvents.onCopy}
                  onViewDetails={variantFormEvents.onViewDetails}
                  key={variantForm.fieldId}
                  variantForm={variantForm}
                  isSelected={index === dietForm.selectedVariantFormIndex}
                  onSelect={variantFormEvents.onSelect}
                  ref={getVariantItemRefById(variantForm.fieldId)}
                >
                  {variantForm.name}
                </VariantItem>
              )
            })}

            {provided.placeholder}
          </HFadeScroll>
        )}
      </Droppable>

      {isPhone ? (
        <VariantsMenuOrDrawer onVariantFormSelect={onVariantFormSelect} />
      ) : (
        <ScrollButtons
          scrollNodeRef={scrollNodeRef}
          showsButtons={scrollState.showsScrollButtons}
          canScrollLeft={scrollState.canScrollLeft}
          canScrollRight={scrollState.canScrollRight}
        />
      )}

      <VariantNameModal
        isOpen={nameModalDisclosure.isOpen}
        onClose={nameModalDisclosure.onClose}
        variantFormIndex={variantFormEvents.variantFormIndex}
      />

      {variantFormEvents.variantForm && (
        <VariantsDetailsModal
          isOpen={detailsModalDisclosure.isOpen}
          onClose={detailsModalDisclosure.onClose}
          initialVariantForm={variantFormEvents.variantForm}
        />
      )}
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <VariantsList {...props} forwardedRef={ref} />
))
