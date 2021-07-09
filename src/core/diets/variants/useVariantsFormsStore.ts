import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import {
  getVariantForm,
  getVariantsFormsPath,
  VariantField,
  VariantForm,
} from './variantForm'
import deepCopy from 'general/deepCopy'
import { v4 as uuidv4 } from 'uuid'
import { useCallback, useMemo, useRef } from 'react'
import tuple from 'general/tuple'

type Params = {
  onBeforeVariantFormAppend: (variantForm: VariantForm) => void
  onBeforeInsertClonedVariantForm: (variantForm: VariantForm) => void
  onAfterChange: () => void
}

function useVariantsFormsStore({
  onBeforeVariantFormAppend,
  onBeforeInsertClonedVariantForm,
  onAfterChange,
}: Params) {
  const { setValue, control, getValues } = useFormContext()
  const prevSelectedVariantFormIndexRef = useRef<number>(0)

  const selectedVariantFormIndex =
    useWatch({
      name: 'selectedVariantFormIndex',
      control,
    }) || 0

  const { fields, append, remove, insert, move } = useFieldArray({
    name: getVariantsFormsPath() as any,
    control,
  })

  const variantsFields = fields as VariantField[]

  const getVariantFormCopy = useCallback(
    (index: number, newName: string) => {
      const values = getValues()
      const originalVariantForm = values.variantsForms[index]
      const copiedVariantForm = deepCopy(
        originalVariantForm,
        (key: string, value: any) => {
          if (key === 'fieldId') {
            return uuidv4()
          }

          return value
        }
      ) as VariantForm

      copiedVariantForm.name = newName

      return copiedVariantForm
    },
    [getValues]
  )

  const setSelectedVariantFormIndex = useCallback(
    (index: number) => {
      prevSelectedVariantFormIndexRef.current = selectedVariantFormIndex
      setValue('selectedVariantFormIndex', index)
      onAfterChange()
    },
    [setValue, onAfterChange, selectedVariantFormIndex]
  )

  const appendVariantForm = useCallback(
    (name: string) => {
      const newVariantForm = getVariantForm(name)
      const countBeforeAdd = variantsFields.length - 1

      onBeforeVariantFormAppend(newVariantForm)

      append(newVariantForm)
      setSelectedVariantFormIndex(countBeforeAdd + 1)

      onAfterChange()
    },
    [
      onBeforeVariantFormAppend,
      append,
      setSelectedVariantFormIndex,
      onAfterChange,
      variantsFields,
    ]
  )

  const cloneVariantForm = useCallback(
    (name: string, index: number) => {
      const copiedVariantForm = getVariantFormCopy(index, name)

      onBeforeInsertClonedVariantForm(copiedVariantForm)

      insert(variantsFields.length, copiedVariantForm)
      setSelectedVariantFormIndex(variantsFields.length)

      onAfterChange()
    },
    [
      onBeforeInsertClonedVariantForm,
      insert,
      setSelectedVariantFormIndex,
      onAfterChange,
      variantsFields,
      getVariantFormCopy,
    ]
  )

  const removeVariantForm = useCallback(
    (indexToRemove: number) => {
      if (indexToRemove < selectedVariantFormIndex) {
        setSelectedVariantFormIndex(selectedVariantFormIndex - 1)
      } else if (
        indexToRemove === selectedVariantFormIndex &&
        indexToRemove > 0
      ) {
        setSelectedVariantFormIndex(indexToRemove - 1)
      }
      remove(indexToRemove)
      onAfterChange()
    },
    [
      remove,
      setSelectedVariantFormIndex,
      selectedVariantFormIndex,
      onAfterChange,
    ]
  )

  const renameVariantForm = useCallback(
    (name: string, indexToRename: number) => {
      const values = getValues()

      const updatedVariantsForms = values.variantsForms.map(
        (variantForm: VariantForm, index: number) => {
          if (index === indexToRename) {
            return {
              ...variantForm,
              name,
            }
          }

          return variantForm
        }
      )

      const path = getVariantsFormsPath()
      setValue(path, updatedVariantsForms)

      onAfterChange()
    },
    [setValue, getValues, onAfterChange]
  )

  const reorderVariantsForms = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      move(sourceIndex, destinationIndex)
      setSelectedVariantFormIndex(destinationIndex)
      onAfterChange()
    },
    [move, onAfterChange, setSelectedVariantFormIndex]
  )

  const methods = useMemo(
    () => ({
      setSelectedVariantFormIndex,
      appendVariantForm,
      cloneVariantForm,
      removeVariantForm,
      renameVariantForm,
      reorderVariantsForms,
    }),
    [
      setSelectedVariantFormIndex,
      appendVariantForm,
      cloneVariantForm,
      removeVariantForm,
      renameVariantForm,
      reorderVariantsForms,
    ]
  )

  const state = useMemo(
    () => ({
      selectedVariantFormIndex,
      variantsFields,
      selectedVariantField: variantsFields[selectedVariantFormIndex],
    }),
    [selectedVariantFormIndex, variantsFields]
  )

  return tuple(state, methods)
}

type VariantsFormsStore = ReturnType<typeof useVariantsFormsStore>

export type { VariantsFormsStore }

export default useVariantsFormsStore
