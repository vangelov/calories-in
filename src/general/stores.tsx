import {
  Context,
  useContext,
  createContext,
  ReactNode,
  useMemo,
  Provider,
} from 'react'

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

function makeProvider<T>() {
  const Context = createContext<T | undefined>(undefined)
  const useContext = makeUseContext(Context)

  return [Context.Provider, useContext] as const
}

function makeStoreProvider<State, Actions, StoreParams extends object>(
  useStore: (params: StoreParams) => readonly [State, Actions],
  ...selectors: ((state: State) => any)[]
) {
  const [StateProvider, useState] = makeProvider<State>()
  const [ActionsProvider, useActions] = makeProvider<Actions>()

  const selectorProviders: Provider<any>[] = []
  const useSelectorHooks: any[] = []

  selectors.forEach(() => {
    const [SelectorProvider, useSelector] = makeProvider<any>()
    selectorProviders.push(SelectorProvider)
    useSelectorHooks.push(useSelector)
  })

  function StoreProvider(props: StoreParams & { children: ReactNode }) {
    const { children, ...storeParams } = props
    const [state, methods] = useStore(storeParams as StoreParams)

    let finalChildren = children

    selectorProviders.forEach((SelectorProvider, index) => {
      const selector = selectors[index]
      const value = selector(state)
      finalChildren = (
        <SelectorProvider value={value}>{finalChildren}</SelectorProvider>
      )
    })

    return (
      <ActionsProvider value={methods}>
        <StateProvider value={state}>{finalChildren}</StateProvider>
      </ActionsProvider>
    )
  }

  return [StoreProvider, useState, useActions, ...useSelectorHooks] as const
}

function useCallbacksMemo<T extends object>(methods: T) {
  return useMemo(() => methods, Object.values(methods)) // eslint-disable-line react-hooks/exhaustive-deps
}

export { makeStoreProvider, useCallbacksMemo }
