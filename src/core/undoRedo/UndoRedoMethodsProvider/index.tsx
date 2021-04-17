import { DietForm } from 'core/dietForm'
import { ReactNode, useCallback, useRef, useMemo, useState } from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import DeltasStack from './deltasStack'
import { UndoRedoMethodsContext } from './context'
import useKeyboard from './useKeyboard'
import { useUndoRedoSetState } from 'core/undoRedo'

type Props = {
  dietForm: DietForm
  children: (currentDietForm: DietForm, version: string) => ReactNode
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

function UndoRedoMethodsProvider({ children, dietForm }: Props) {
  const deltasStackRef = useRef(new DeltasStack())
  const lastFormRef = useRef<DietForm>(dietForm)
  const [versionIndex, setVersionIndex] = useState(0)
  const markRef = useRef(false)
  const timeoutIdRef = useRef<number>()
  const undoRedoSetState = useUndoRedoSetState()

  const saveLastChange = useCallback(() => {
    markRef.current = true
  }, [])

  const updateState = useCallback(() => {
    undoRedoSetState({
      canUndo: deltasStackRef.current.canUnpatch,
      canRedo: deltasStackRef.current.canPatch,
    })
  }, [undoRedoSetState])

  const undo = useCallback(() => {
    const delta = deltasStackRef.current.getNextDeltaToUnpatch()

    if (delta) {
      lastFormRef.current = patcher.unpatch(lastFormRef.current, delta)

      setVersionIndex(versionIndex => versionIndex + 1)
      updateState()
    }
  }, [updateState])

  const redo = useCallback(() => {
    const delta = deltasStackRef.current.getNextDeltaToPatch()
    if (delta) {
      lastFormRef.current = patcher.patch(lastFormRef.current, delta)

      setVersionIndex(versionIndex => versionIndex - 1)
      updateState()
    }
  }, [updateState])

  const pushForm = useCallback(
    form => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }

      timeoutIdRef.current = window.setTimeout(() => {
        if (markRef.current) {
          markRef.current = false
          // console.log('comp1', lastFormRef.current)
          // console.log('comp2', form)

          const delta = patcher.diff(lastFormRef.current, form)

          if (delta) {
            lastFormRef.current = form
            // console.log('push', delta)
            deltasStackRef.current.push(delta)
            updateState()
          }
        }
      }, TIMEOUT_IN_MS)
    },
    [updateState]
  )

  useKeyboard({ undo, redo })

  const methods = useMemo(
    () => ({
      undo,
      redo,
      saveLastChange,
      pushForm,
    }),
    [undo, redo, saveLastChange, pushForm]
  )

  const version = `dietForm.${dietForm.formId}.${versionIndex}`

  return (
    <UndoRedoMethodsContext.Provider value={methods}>
      {children(lastFormRef.current, version)}
    </UndoRedoMethodsContext.Provider>
  )
}

export * from './context'

export default UndoRedoMethodsProvider
