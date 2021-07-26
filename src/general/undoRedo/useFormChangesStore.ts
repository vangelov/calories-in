import {
  useCallback,
  useRef,
  useMemo,
  useState,
  RefObject,
  useEffect,
} from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import DeltasStack from './deltasStack'
import deepCopy from 'general/deepCopy'
import { makeStoreProvider } from 'general/stores'

type Params = {
  form: object
  horizontalScrollRef: RefObject<HTMLDivElement>
  onUndo: (form: object, scrollTop: number, scrollLeft: number) => void
  onRedo: (form: object, scrollTop: number, scrollLeft: number) => void
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

type UndoRedoState = {
  canUndo: boolean
  canRedo: boolean
}

function useFormChangesStore({
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
    const result = deltasStackRef.current.getNextResultToUnpatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.unpatch(lastFormRef.current, delta)

      setState({
        canUndo: deltasStackRef.current.canUnpatch,
        canRedo: deltasStackRef.current.canPatch,
      })

      onUndo(lastFormRef.current, scrollTop, scrollLeft)
    }
  }, [onUndo])

  const redo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToPatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.patch(lastFormRef.current, delta)

      setState({
        canUndo: deltasStackRef.current.canUnpatch,
        canRedo: deltasStackRef.current.canPatch,
      })

      onRedo(lastFormRef.current, scrollTop, scrollLeft)
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
          //console.log('comp1', lastFormRef.current)
          //console.log('comp2', form)

          if (
            delta &&
            !(
              Object.keys(delta).length === 1 &&
              delta.selectedVariantFormIndex !== undefined
            )
          ) {
            console.log('push', delta)
            console.log('push scroll', horizontalScrollRef.current?.scrollLeft)
            lastFormRef.current = deepCopy(form)
            //console.log('push', delta)
            //console.log('l,', lastFormRef.current)
            deltasStackRef.current.push(
              delta,
              window.scrollY,
              horizontalScrollRef.current
                ? horizontalScrollRef.current.scrollLeft
                : 0
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

  const methods = useMemo(
    () => ({
      undo,
      redo,
    }),
    [undo, redo]
  )

  return [state, methods] as const
}

type FormChangesStore = ReturnType<typeof useFormChangesStore>

export type { FormChangesStore }

const [
  FormChangesStoreProvider,
  useFormChangesStoreState,
  useFormChangesStoreMethods,
] = makeStoreProvider(useFormChangesStore)

export {
  FormChangesStoreProvider,
  useFormChangesStoreState,
  useFormChangesStoreMethods,
}

export default useFormChangesStore
