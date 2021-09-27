import { Button, ButtonProps } from '@chakra-ui/react'
import { useBlobUrl } from 'persistence'
import prettyBytes from 'pretty-bytes'

type Props = {
  blob?: Blob
  onClose: () => void
  fileName: string
  label: string
} & ButtonProps

function DownloadButton({ blob, onClose, fileName, label, ...rest }: Props) {
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
      {...rest}
    >
      {blob === undefined || rest.isDisabled
        ? label
        : `${label} (${prettyBytes(blob.size)})`}
    </Button>
  )
}

export default DownloadButton
