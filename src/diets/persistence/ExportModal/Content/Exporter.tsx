import { usePDF } from '@react-pdf/renderer'
import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm, useGetDietFormStatsTree } from 'diets'
import { useFoods } from 'foods'
import { Loader } from 'general'
import { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { usePortions } from 'portions'

type Props = {
  onUpdate: (blob: Blob, url: string) => void
}

function Exporter({ onUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()
  const getDietFormStatsTree = useGetDietFormStatsTree()
  const dietFormStatsTree = getDietFormStatsTree(dietForm)
  const [isLoading, setIsLoading] = useState(true)

  const document = (
    <PdfDietEditor
      dietForm={dietForm}
      foodsById={foodsById}
      portionsById={portionsById}
      subject={JSON.stringify(dietForm)}
      dietFormStatsTree={dietFormStatsTree}
    />
  )

  const [instance] = usePDF({ document })
  const { blob, url } = instance

  useEffect(() => {
    if (blob && url && !isLoading) {
      onUpdate(blob, url)
    }
  }, [blob, url, isLoading, onUpdate])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return <Loader label="Exporting..." />
  }

  return (
    <Alert
      status="success"
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
        Your PDF file was successfully created!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        You can download it or view it in the browser
      </AlertDescription>
    </Alert>
  )
}

export default Exporter
