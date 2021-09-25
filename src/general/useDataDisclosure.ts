import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/hooks'
import { useCallback, useMemo, useState } from 'react'

function useDataDisclosure<T>(initialData: T) {
  const disclosure = useDisclosure()
  const [data, setData] = useState<T>(initialData)

  const onOpen = useCallback(
    (data: T) => {
      setData(data)
      disclosure.onOpen()
    },
    [disclosure]
  )

  const result = useMemo(
    () => ({
      ...disclosure,
      data,
      onOpen,
    }),
    [data, disclosure, onOpen]
  )

  return result
}

type DataDisclosure<T> = UseDisclosureReturn & {
  data: T
  onOpen: (data: T) => void
}

export type { DataDisclosure }

export default useDataDisclosure
