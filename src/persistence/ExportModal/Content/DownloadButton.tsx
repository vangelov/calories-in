import { Button } from '@chakra-ui/react'
import { useDietForm } from 'diets'
import { useBlobUrl } from 'persistence'
import prettyBytes from 'pretty-bytes'

type Props = {
  blob?: Blob
  onClose: () => void
}

function DownloadButton({ blob, onClose }: Props) {
  const dietForm = useDietForm()
  const { url } = useBlobUrl({ blob })

  return (
    <Button
      as="a"
      download={dietForm.name || 'Untitled'}
      target="_blank"
      href={url}
      isDisabled={!url}
      colorScheme="teal"
      variant="solid"
      onClick={onClose}
    >
      {blob === undefined
        ? 'Download PDF'
        : `Download PDF (${prettyBytes(blob.size)})`}
    </Button>
  )
}

export default DownloadButton
