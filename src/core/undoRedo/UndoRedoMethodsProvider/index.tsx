import { DietForm } from 'core/dietForm'
import {
  ReactNode,
  useCallback,
  useRef,
  useMemo,
  useState,
  RefObject,
} from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import DeltasStack from './DeltasStack'
import { UndoRedoMethodsContext } from './context'
import useKeyboard from './useKeyboard'
import { useUndoRedoSetState } from 'core/undoRedo'

type Props = {
  dietForm: DietForm
  scrollRef: RefObject<HTMLDivElement>
  children: (currentDietForm: DietForm, version: string, t: number) => ReactNode
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

function UndoRedoMethodsProvider({ children, dietForm, scrollRef }: Props) {
  const deltasStackRef = useRef(new DeltasStack())
  const lastFormRef = useRef<DietForm>(dietForm)
  const [versionIndex, setVersionIndex] = useState(0)
  const markRef = useRef(false)
  const timeoutIdRef = useRef<number>()
  const undoRedoSetState = useUndoRedoSetState()
  const [versionScrollTop, setVersionScrollTop] = useState(0)

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
      const { delta, scrollTop } = result
      lastFormRef.current = patcher.unpatch(lastFormRef.current, delta)

      setVersionScrollTop(scrollTop)
      setVersionIndex(versionIndex => versionIndex + 1)
      updateState()
    }
  }, [updateState])

  const redo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToPatch()

    if (result) {
      const { delta, scrollTop } = result
      lastFormRef.current = patcher.patch(lastFormRef.current, delta)

      setVersionScrollTop(scrollTop)
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

          if (delta) {
            lastFormRef.current = form

            deltasStackRef.current.push(
              delta,
              scrollRef.current ? scrollRef.current.scrollTop : 0
            )
            updateState()
          }
        }
      }, TIMEOUT_IN_MS)
    },
    [updateState, scrollRef]
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
      {children(lastFormRef.current, version, versionScrollTop)}
    </UndoRedoMethodsContext.Provider>
  )
}

export * from './context'

export default UndoRedoMethodsProvider
