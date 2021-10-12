import { useCallback, useRef, useState, RefObject, useEffect } from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import { Delta } from 'jsondiffpatch'
import DeltasStack from './deltasStack'
import { makeStoreProvider, useCallbacksMemo, deepCopy } from 'general'
import { DietForm } from 'diets'
import getAppLocation, { AppLocation } from './appLocation'

type Params = {
  form: DietForm
  horizontalScrollRef: RefObject<HTMLDivElement>
  onUndo: (form: DietForm, appLocation: AppLocation) => void
  onRedo: (form: DietForm, appLocation: AppLocation) => void
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

type UndoRedoState = {
  canUndo: boolean
  canRedo: boolean
}

function shouldSaveDelta(delta: Delta) {
  const onlySelectedFormIndexChanged =
    Object.keys(delta).length === 1 &&
    delta.selectedVariantFormIndex !== undefined

  return false === onlySelectedFormIndexChanged
}

function useDietFormVersionsStore({
  form,
  horizontalScrollRef,
  onUndo,
  onRedo,
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

      //console.log('push', form, lastFormRef.current)

      timeoutIdRef.current = window.setTimeout(() => {
        if (form !== lastFormRef.current) {
          const delta = patcher.diff(lastFormRef.current, form)
          //console.log('d', delta)
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
    [horizontalScrollRef]
  )

  useEffect(() => {
    pushForm(form)
  }, [pushForm, form])

  const methods = useCallbacksMemo({ undo, redo })

  return [state, methods] as const
}

const [
  DietFormVersionsStoreProvider,
  useDietFormVersions,
  useDietFormVersionsActions,
] = makeStoreProvider(useDietFormVersionsStore)

export {
  DietFormVersionsStoreProvider,
  useDietFormVersions,
  useDietFormVersionsActions,
}

export default useDietFormVersionsStore
