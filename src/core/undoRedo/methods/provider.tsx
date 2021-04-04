import { DietForm } from 'core/dietForm'
import { ReactNode, useCallback, useRef, useMemo, useState } from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import DeltasStack from './stack'
import { UndoRedoMethodsContext } from './context'
import useKeyboard from './useKeyboard'
import { useUndoRedoSetState } from '../state'

type Props = {
  dietForm: DietForm
  children: (dietForm: DietForm, t: string) => ReactNode
}

const patch = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

function UndoRedoMethodsProvider({ children, dietForm }: Props) {
  const deltasStackRef = useRef(new DeltasStack())
  const lastFormRef = useRef<DietForm>(dietForm)
  const [t, setT] = useState(0)
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
      lastFormRef.current = patch.unpatch(lastFormRef.current, delta)

      setT(t => t + 1)
      updateState()
    }
  }, [updateState])

  const redo = useCallback(() => {
    const delta = deltasStackRef.current.getNextDeltaToPatch()
    if (delta) {
      lastFormRef.current = patch.patch(lastFormRef.current, delta)

      setT(t => t - 1)
      updateState()
    }
  }, [updateState])

  const push = useCallback(
    form => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }

      timeoutIdRef.current = window.setTimeout(() => {
        if (markRef.current) {
          markRef.current = false
          console.log('comp1', lastFormRef.current)
          console.log('comp2', form)

          const delta = patch.diff(lastFormRef.current, form)

          if (delta) {
            lastFormRef.current = form
            console.log('push', delta)
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
      push,
    }),
    [undo, redo, saveLastChange, push]
  )

  // console.log('l', `dietForm${dietForm.formId}-${t}`, lastFormRef.current)
  return (
    <UndoRedoMethodsContext.Provider value={methods}>
      {children(lastFormRef.current, `${dietForm.formId}-${t}`)}
    </UndoRedoMethodsContext.Provider>
  )
}

export default UndoRedoMethodsProvider
