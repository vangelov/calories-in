import { useRef } from 'react'

type Deferred<T = undefined> = {
  resolve: (value: T) => void
  reject: (reason: any) => void
}

const useDeferredPromise = <T = undefined>() => {
  const deferredRef = useRef<Deferred<T>>()

  function create() {
    return new Promise<T>((resolve, reject) => {
      deferredRef.current = {
        resolve,
        reject,
      }
    })
  }

  function resolve(value: T) {
    if (deferredRef.current) {
      deferredRef.current.resolve(value)
    }
  }

  function reject(reason: any) {
    if (deferredRef.current) {
      deferredRef.current.reject(reason)
    }
  }

  return {
    create,
    resolve,
    reject,
  }
}

export default useDeferredPromise
