import { Button } from '@chakra-ui/react'
import { useBlobUrl } from 'persistence'
import prettyBytes from 'pretty-bytes'

type Props = {
  blob?: Blob
  onClose: () => void
  fileName: string
  label: string
}

function DownloadButton({ blob, onClose, fileName, label }: Props) {
  const { url } = useBlobUrl({ blob })

  return (
    <Button
      as="a"
      download={fileName}
      target="_blank"
      href={url}
      isDisabled={!url}
      colorScheme="teal"
      variant="solid"
      onClick={onClose}
    >
      {blob === undefined ? label : `${label} (${prettyBytes(blob.size)})`}
    </Button>
  )
}

export default DownloadButton
