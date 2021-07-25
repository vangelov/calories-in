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
  onUndo: (form: object) => void
  onRedo: (form: object) => void
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

type UndoRedoState = {
  versionScrollTop: number
  versionScrollLeft: number
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
    versionScrollTop: 0,
    versionScrollLeft: 0,
    canUndo: false,
    canRedo: false,
  })

  const undo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToUnpatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      console.log('undo', lastFormRef.current, delta)
      lastFormRef.current = patcher.unpatch(lastFormRef.current, delta)

      setState({
        versionScrollTop: scrollTop,
        versionScrollLeft: scrollLeft,
        canUndo: deltasStackRef.current.canUnpatch,
        canRedo: deltasStackRef.current.canPatch,
      })

      onUndo(lastFormRef.current)
    }
  }, [onUndo])

  const redo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToPatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.patch(lastFormRef.current, delta)
      console.log('redo', lastFormRef.current, delta)

      setState({
        versionScrollTop: scrollTop,
        versionScrollLeft: scrollLeft,
        canUndo: deltasStackRef.current.canUnpatch,
        canRedo: deltasStackRef.current.canPatch,
      })

      onRedo(lastFormRef.current)
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

          if (delta) {
            console.log('push', delta)

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

            setState(state => ({
              ...state,
              canUndo: deltasStackRef.current.canUnpatch,
              canRedo: deltasStackRef.current.canPatch,
            }))
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

  console.log('s', state)

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
