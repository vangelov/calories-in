import { Context, useContext } from 'react'

function guard(value: unknown): value is object {
  return value !== undefined
}

function makeUseContext<T>(context: Context<T>) {
  function useCustomContext() {
    const value = useContext(context)

    if (!guard(value)) {
      throw new Error('Missing store context provider')
    }

    return value
  }

  return useCustomContext
}

export default makeUseContext
