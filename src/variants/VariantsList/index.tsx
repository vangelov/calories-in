import { Flex } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import { VariantModal } from 'variants'
import { ForwardedRef, createRef, forwardRef, useRef } from 'react'
import { useDietForm } from 'diets'
import { VariantForm } from 'variants'
import useActions from './useActions'
import { HFadeScroll, ResponsiveIconButton } from 'general'
import mergeRefs from 'react-merge-refs'
import ScrollButtons from './ScrollButtons'

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

  const actions = useActions({
    onVariantFormSelect,
    onVariantFormCopy,
  })

  const dietForm = useDietForm()

  return (
    <Flex>
      <ResponsiveIconButton
        borderRadius="full"
        size="sm"
        aria-label="Add variant"
        icon={<Plus size={20} pointerEvents="none" />}
        variant="outline"
        onClick={actions.onAppend}
        isResponsive={false}
        mr={3}
        flexShrink={0}
      />

      <Droppable
        droppableId="variantsList"
        type="variantsList"
        direction="horizontal"
      >
        {(provided, snapshot) => (
          <HFadeScroll
            onScrollStateChange={actions.onScrollStateChange}
            ref={mergeRefs([provided.innerRef, scrollNodeRef, forwardedRef])}
          >
            {dietForm.variantsForms.map((variantForm, index) => {
              return (
                <VariantItem
                  canRemove={dietForm.variantsForms.length > 1}
                  mr={1}
                  index={index}
                  onDelete={actions.onRemove}
                  onEditName={actions.onRename}
                  onClone={actions.onCopy}
                  key={variantForm.fieldId}
                  variantForm={variantForm}
                  isSelected={index === dietForm.selectedVariantFormIndex}
                  onSelect={actions.onSelect}
                >
                  {variantForm.name}
                </VariantItem>
              )
            })}

            {provided.placeholder}
          </HFadeScroll>
        )}
      </Droppable>

      <ScrollButtons
        scrollNodeRef={scrollNodeRef}
        showsButtons={actions.showsScrollButtons}
        canScrollLeft={actions.canScrollLeft}
        canScrollRight={actions.canScrollRight}
      />

      <VariantModal
        isOpen={actions.modalDisclosure.isOpen}
        onClose={actions.onVariantModalClose}
        submitAction={actions.submitAction}
        variantFormIndex={actions.variantFormIndex}
      />
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <VariantsList {...props} forwardedRef={ref} />
))
