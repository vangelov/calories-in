import ReactPDF, { PDFViewer, BlobProvider } from '@react-pdf/renderer'
import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm } from 'diets'
import { useFoods } from 'foods'
import { useScreenSize } from 'general'
import { useRef } from 'react'
import Loader from './Loader'
import { HStack, Text, chakra } from '@chakra-ui/react'
import { Check } from 'react-feather'

const CheckStyled = chakra(Check)

type Props = {
  onUrlUpdate: (url: string) => void
}

function Exporter({ onUrlUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const screenSize = useScreenSize()
  const isUrlUpdatedRef = useRef(false)

  function onRender({ blob }: ReactPDF.OnRenderProps) {
    if (false === isUrlUpdatedRef.current) {
      isUrlUpdatedRef.current = true

      const url = URL.createObjectURL(blob)
      onUrlUpdate(url)
    }
  }

  const document = (
    <PdfDietEditor
      dietForm={dietForm}
      foodsById={foodsById}
      onRender={onRender}
      subject={JSON.stringify(dietForm)}
    />
  )

  if (screenSize < 2) {
    return (
      <BlobProvider document={document}>
        {({ loading }) => {
          if (loading) {
            return <Loader />
          }

          return (
            <HStack spacing={2}>
              <CheckStyled color="teal" />
              <Text size="lg">Done</Text>
            </HStack>
          )
        }}
      </BlobProvider>
    )
  }

  return (
    <PDFViewer showToolbar={false} width="100%" height="300px">
      {document}
    </PDFViewer>
  )
}

export default Exporter
