import { usePDF } from '@react-pdf/renderer'
import { ReactElement, useEffect, useState } from 'react'

type Props = {
  onUpdate: (blob: Blob, url: string) => void
  document: ReactElement
}

const MINIMUM_LOADING_TIME_IN_MS = 500

function isReady(
  instance: {
    blob: Blob | null
    url: string | null
  },
  isLoading: boolean
): instance is { blob: Blob; url: string } {
  const { blob, url } = instance
  return blob !== null && url !== null && !isLoading
}

function usePdfExport({ onUpdate, document }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [instance] = usePDF({ document })

  useEffect(() => {
    if (isReady(instance, isLoading)) {
      onUpdate(instance.blob, instance.url)
    }
  }, [onUpdate, instance, isLoading])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, MINIMUM_LOADING_TIME_IN_MS)
  }, [])

  return {
    error: instance.error,
    isLoading: !isReady(instance, isLoading) && !instance.error,
  }
}

export default usePdfExport
