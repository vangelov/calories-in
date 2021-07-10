import { DietForm } from 'core/diets'
import { useCallback, useRef, useMemo, useState, RefObject } from 'react'
import * as jsondiffpatch from 'jsondiffpatch'
import DeltasStack from './deltasStack'
import tuple from 'general/tuple'

type Params = {
  dietForm: DietForm
  horizontalScrollRef: RefObject<HTMLDivElement>
}

const patcher = jsondiffpatch.create({
  objectHash: (item: any) => item.fieldId,
})

const TIMEOUT_IN_MS = 200

function useFormChangesStore({ dietForm, horizontalScrollRef }: Params) {
  const deltasStackRef = useRef(new DeltasStack())
  const lastFormRef = useRef<DietForm>(dietForm)
  const [versionIndex, setVersionIndex] = useState(0)
  const markRef = useRef(false)
  const timeoutIdRef = useRef<number>()
  const [versionScrollTop, setVersionScrollTop] = useState(0)
  const [versionScrollLeft, setVersionScrollLeft] = useState(0)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const saveLastChange = useCallback(() => {
    markRef.current = true
  }, [])

  const undo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToUnpatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.unpatch(lastFormRef.current, delta)

      setVersionScrollTop(scrollTop)
      setVersionScrollLeft(scrollLeft)
      setVersionIndex(versionIndex => versionIndex + 1)

      setCanUndo(deltasStackRef.current.canUnpatch)
      setCanRedo(deltasStackRef.current.canPatch)
    }
  }, [])

  const redo = useCallback(() => {
    const result = deltasStackRef.current.getNextResultToPatch()

    if (result) {
      const { delta, scrollTop, scrollLeft } = result
      lastFormRef.current = patcher.patch(lastFormRef.current, delta)

      setVersionScrollTop(scrollTop)
      setVersionScrollLeft(scrollLeft)
      setVersionIndex(versionIndex => versionIndex - 1)

      setCanUndo(deltasStackRef.current.canUnpatch)
      setCanRedo(deltasStackRef.current.canPatch)
    }
  }, [])

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

            setCanUndo(deltasStackRef.current.canUnpatch)
            setCanRedo(deltasStackRef.current.canPatch)
          }
        }
      }, TIMEOUT_IN_MS)
    },
    [horizontalScrollRef]
  )

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

  const state = useMemo(
    () => ({
      form: lastFormRef.current,
      version,
      versionScrollTop,
      versionScrollLeft,
      canUndo,
      canRedo,
    }),
    [version, versionScrollTop, versionScrollLeft, canUndo, canRedo]
  )

  return tuple(state, methods)
}

type FormChangesStore = ReturnType<typeof useFormChangesStore>

export type { FormChangesStore }

export default useFormChangesStore