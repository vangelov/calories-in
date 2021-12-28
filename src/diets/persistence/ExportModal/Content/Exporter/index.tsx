import { Loader } from 'general'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import usePdfExport from './usePdfExport'

type Props = {
  onUpdate: (blob: Blob, url: string) => void
}

function Exporter({ onUpdate }: Props) {
  const { isLoading, error } = usePdfExport({ onUpdate })

  if (isLoading) {
    return <Loader label="Exporting..." />
  }

  return (
    <Alert
      status={error ? 'error' : 'success'}
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      bg="white"
    >
      <AlertIcon color={error ? 'red.400' : 'teal.400'} boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {error
          ? 'Something went wrong while creating your pdf file'
          : 'Your PDF file is ready'}
      </AlertTitle>
      {!error && (
        <AlertDescription maxWidth="sm">
          Downloading this plan will allow you to import it later if you need to
          update it.
        </AlertDescription>
      )}
    </Alert>
  )
}

export default Exporter
