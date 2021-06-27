import { DietForm } from 'core/diets'
import {
  ReactNode,
  useCallback,
  useRef,
  useMemo,
  useState,
  RefObject,
} from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import DeltasStack from './deltasStack'
import { UndoRedoMethodsContext } from './context'
import useKeyboard from './useKeyboard'
import { useUndoRedoSetState } from 'general/undoRedo'

type Props = {
  dietForm: DietForm
  children: (
    currentDietForm: DietForm,
    version: string,
    scrollTop: number,
    scrollLeft: number
  ) => ReactNode
  horizontalScrollRef: RefObject<HTMLDivElement>
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

function UndoRedoMethodsProvider({
  children,
  dietForm,
  horizontalScrollRef,
}: Props) {
  const deltasStackRef = useRef(new DeltasStack())
  const lastFormRef = useRef<DietForm>(dietForm)
  const [versionIndex, setVersionIndex] = useState(0)
  const markRef = useRef(false)
  const timeoutIdRef = useRef<number>()
  const undoRedoSetState = useUndoRedoSetState()
  const [versionScrollTop, setVersionScrollTop] = useState(0)
  const [versionScrollLeft, setVersionScrollLeft] = useState(0)

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
    const result = deltasStackRef.current.getNextResultToUnpatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.unpatch(lastFormRef.current, delta)

      setVersionScrollTop(scrollTop)
      setVersionScrollLeft(scrollLeft)
      setVersionIndex(versionIndex => versionIndex + 1)
      updateState()
    }
  }, [updateState])

  const redo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToPatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.patch(lastFormRef.current, delta)

      setVersionScrollTop(scrollTop)
      setVersionScrollLeft(scrollLeft)
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
          const delta = patcher.diff(lastFormRef.current, form)
          //console.log('comp1', lastFormRef.current)
          //console.log('comp2', form)

          if (delta) {
            lastFormRef.current = form
            console.log('push', delta)

            deltasStackRef.current.push(
              delta,
              window.scrollY,
              horizontalScrollRef.current
                ? horizontalScrollRef.current.scrollLeft
                : 0
            )
            updateState()
          }
        }
      }, TIMEOUT_IN_MS)
    },
    [updateState, horizontalScrollRef]
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
      {children(
        lastFormRef.current,
        version,
        versionScrollTop,
        versionScrollLeft
      )}
    </UndoRedoMethodsContext.Provider>
  )
}

export * from './context'

export default UndoRedoMethodsProvider
