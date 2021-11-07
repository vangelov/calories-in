import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm, useGetDietFormStatsTree } from 'diets'
import { useFoods } from 'foods'
import { Loader } from 'general'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { usePortions } from 'portions'
import usePdfExport from './usePdfExport'

type Props = {
  onUpdate: (blob: Blob, url: string) => void
}

function Exporter({ onUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()
  const getDietFormStatsTree = useGetDietFormStatsTree()
  const dietFormStatsTree = getDietFormStatsTree(dietForm)

  const document = (
    <PdfDietEditor
      dietForm={dietForm}
      foodsById={foodsById}
      portionsById={portionsById}
      subject={JSON.stringify(dietForm)}
      dietFormStatsTree={dietFormStatsTree}
    />
  )

  const { isLoading, error } = usePdfExport({ document, onUpdate })

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
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {error
          ? 'Something went wrong while creating your pdf file'
          : 'Your PDF file is ready!'}
      </AlertTitle>
      {!error && (
        <AlertDescription maxWidth="sm">
          You can download it or view it in the browser
        </AlertDescription>
      )}
    </Alert>
  )
}

export default Exporter
