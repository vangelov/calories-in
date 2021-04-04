import { DietForm } from 'core/dietForm'
import { createContext, useContext } from 'react'

type UndoRedoMethods = {
  saveLastChange: () => void
  undo: () => void
  redo: () => void
  pushForm: (form: DietForm) => void
}

const UndoRedoMethodsContext = createContext<UndoRedoMethods | undefined>(
  undefined
)

function useUndoRedoMethods() {
  const methods = useContext(UndoRedoMethodsContext)

  if (!methods) {
    throw new Error()
  }

  return methods
}

export type { UndoRedoMethods }

export { UndoRedoMethodsContext, useUndoRedoMethods }
