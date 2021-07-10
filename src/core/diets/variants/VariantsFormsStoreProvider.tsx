import makeUseContext from 'general/makeUseContext'
import { useOneTimeCheckStoreMethods } from 'general/oneTimeCheck'
import { useFormChangesStoreMethods } from 'general/undoRedo'
import { createContext, ReactNode, useCallback } from 'react'
import { getInsertVariantFormAnimationKey, VariantForm } from './variantForm'
import useVariantsFormsStore, {
  VariantsFormsStore,
} from './useVariantsFormsStore'
import { useDndResponder } from 'general/dndResponders'
import { DropResult } from 'react-beautiful-dnd'
import { useFormContext } from 'react-hook-form'
import { DietForm } from '../dietForm'

const StateContext = createContext<VariantsFormsStore[0] | undefined>(undefined)
const MethodsContext = createContext<VariantsFormsStore[1] | undefined>(
  undefined
)
const useVariantsFormsStoreState = makeUseContext(StateContext)
const useVariantsFormsStoreMethods = makeUseContext(MethodsContext)

type Props = {
  children: (key: string) => ReactNode
}

function VariantsFormsStoreProvider({ children }: Props) {
  const oneTimeCheckStoreMethods = useOneTimeCheckStoreMethods()
  const formChangesStoreMethods = useFormChangesStoreMethods()
  const dietFormMethods = useFormContext<DietForm>()

  const onVariantFormBeforeAppendOrClone = useCallback(
    (variantForm: VariantForm) => {
      oneTimeCheckStoreMethods.set(
        getInsertVariantFormAnimationKey(variantForm.fieldId)
      )
    },
    [oneTimeCheckStoreMethods]
  )

  const onAfterChange = useCallback(() => {
    formChangesStoreMethods.saveLastChange()
  }, [formChangesStoreMethods])

  const [state, methods] = useVariantsFormsStore({
    onBeforeVariantFormAppend: onVariantFormBeforeAppendOrClone,
    onBeforeInsertClonedVariantForm: onVariantFormBeforeAppendOrClone,
    onAfterChange,
    dietFormMethods,
  })

  useDndResponder('onDragEnd', (result: DropResult) => {
    const { source, destination, type } = result

    if (!destination || type !== 'variantsList') {
      return
    }

    methods.reorderVariantsForms(source.index, destination.index)
  })

  const { selectedVariantFormIndex, selectedVariantField } = state

  return (
    <MethodsContext.Provider value={methods}>
      <StateContext.Provider value={state}>
        {children(
          `${selectedVariantFormIndex}-${selectedVariantField.fieldId}`
        )}
      </StateContext.Provider>
    </MethodsContext.Provider>
  )
}

export { useVariantsFormsStoreState, useVariantsFormsStoreMethods }

export default VariantsFormsStoreProvider
