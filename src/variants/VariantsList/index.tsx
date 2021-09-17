import { Flex, IconButton } from '@chakra-ui/react'
import VariantItem from './VariantItem'
import { Plus } from 'react-feather'
import { Droppable } from 'react-beautiful-dnd'
import VariantNameModal from './VariantNameModal'
import { ForwardedRef, createRef, forwardRef, useRef } from 'react'
import { useDietForm } from 'diets'
import { VariantForm } from 'variants'
import useActions from './useActions'
import { HFadeScroll, useScreenSize } from 'general'
import mergeRefs from 'react-merge-refs'
import ScrollButtons from './ScrollButtons'
import VariantsMenuOrDrawer from '../VariantsMenuOrDrawer'
import { useGetRefForId } from 'dom'

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
  const isPhone = screenSize <= 1

  const actions = useActions({
    onVariantFormSelect,
    onVariantFormCopy,
  })

  const dietForm = useDietForm()
  const getVariantItemRefById = useGetRefForId<HTMLDivElement>()

  return (
    <Flex>
      <IconButton
        borderRadius="full"
        size="sm"
        aria-label="Add variant"
        icon={<Plus size={20} pointerEvents="none" />}
        variant="outline"
        onClick={actions.onAppend}
        mr={3}
        flexShrink={0}
      />
      {!isPhone && (
        <VariantsMenuOrDrawer
          getVariantItemRefById={getVariantItemRefById}
          onVariantFormSelect={onVariantFormSelect}
        />
      )}

      <Droppable
        droppableId="variantsList"
        type="variantsList"
        direction="horizontal"
      >
        {provided => (
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
        <VariantsMenuOrDrawer
          getVariantItemRefById={getVariantItemRefById}
          onVariantFormSelect={onVariantFormSelect}
        />
      ) : (
        <ScrollButtons
          scrollNodeRef={scrollNodeRef}
          showsButtons={actions.showsScrollButtons}
          canScrollLeft={actions.canScrollLeft}
          canScrollRight={actions.canScrollRight}
        />
      )}

      <VariantNameModal
        isOpen={actions.modalDisclosure.isOpen}
        onClose={actions.modalDisclosure.onClose}
        variantFormIndex={actions.variantFormIndex}
      />
    </Flex>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <VariantsList {...props} forwardedRef={ref} />
))
