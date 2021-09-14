import { useEffect, useState } from 'react'

type Params = {
  blob?: Blob
}

function useBlobUrl({ blob }: Params) {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (blob) {
      const blobUrl = URL.createObjectURL(blob)
      setUrl(blobUrl)

      return () => {
        URL.revokeObjectURL(blobUrl)
      }
    }
  }, [blob])

  return {
    url,
  }
}

export default useBlobUrl
