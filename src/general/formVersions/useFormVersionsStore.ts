import { useCallback, useRef, useState, RefObject, useEffect } from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import { Delta } from 'jsondiffpatch'
import DeltasStack from './deltasStack'
import deepCopy from 'general/deepCopy'
import { makeStoreProvider, useCallbacksMemo } from 'general/stores'
import { DietForm } from 'core/diets'
import getAppLocation, { AppLocation } from './appLocation'

type Params = {
  form: DietForm
  horizontalScrollRef: RefObject<HTMLDivElement>
  onUndo: (form: DietForm, appLocation: AppLocation) => void
  onRedo: (form: DietForm, appLocation: AppLocation) => void
  shouldSaveDelta?: (delta: jsondiffpatch.Delta) => boolean
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

type UndoRedoState = {
  canUndo: boolean
  canRedo: boolean
}

function useFormVersionsStore({
  form,
  horizontalScrollRef,
  onUndo,
  onRedo,
  shouldSaveDelta = () => true,
}: Params) {
  const deltasStackRef = useRef(new DeltasStack())
  const lastFormRef = useRef<object>(form)
  const timeoutIdRef = useRef<number>()
  const [state, setState] = useState<UndoRedoState>({
    canUndo: false,
    canRedo: false,
  })

  const undo = useCallback(() => {
    const result = deltasStackRef.current.getNextNodeToUnpatch()

    if (result) {
      const { delta, appLocation } = result
      lastFormRef.current = patcher.unpatch(
        lastFormRef.current,
        deepCopy(delta)
      )

      setState({
        canUndo: deltasStackRef.current.canUnpatch,
        canRedo: deltasStackRef.current.canPatch,
      })

      onUndo(deepCopy(lastFormRef.current), appLocation)
    }
  }, [onUndo])

  const redo = useCallback(() => {
    const result = deltasStackRef.current.getNextNodeToPatch()

    if (result) {
      const { delta, appLocation } = result
      lastFormRef.current = patcher.patch(lastFormRef.current, deepCopy(delta))

      setState({
        canUndo: deltasStackRef.current.canUnpatch,
        canRedo: deltasStackRef.current.canPatch,
      })

      onRedo(deepCopy(lastFormRef.current), appLocation)
    }
  }, [onRedo])

  const pushForm = useCallback(
    form => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }

      timeoutIdRef.current = window.setTimeout(() => {
        if (form !== lastFormRef.current) {
          const delta = patcher.diff(lastFormRef.current, form)

          if (delta && shouldSaveDelta(delta)) {
            lastFormRef.current = deepCopy(form)

            deltasStackRef.current.push(
              delta,
              getAppLocation({ horizontalScrollRef, dietForm: form })
            )

            setState({
              canUndo: deltasStackRef.current.canUnpatch,
              canRedo: deltasStackRef.current.canPatch,
            })
          }
        }
      }, TIMEOUT_IN_MS)
    },
    [horizontalScrollRef, shouldSaveDelta]
  )

  useEffect(() => {
    pushForm(form)
  }, [pushForm, form])

  const methods = useCallbacksMemo({ undo, redo })

  return [state, methods] as const
}

const [
  FormVersionsStoreProvider,
  useFormVersions,
  useFormVersionsActions,
] = makeStoreProvider(useFormVersionsStore)

export { FormVersionsStoreProvider, useFormVersions, useFormVersionsActions }

export default useFormVersionsStore
