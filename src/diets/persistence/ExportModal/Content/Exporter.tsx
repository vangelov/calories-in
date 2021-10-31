import ReactPDF, { PDFViewer, BlobProvider } from '@react-pdf/renderer'
import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm, useGetDietFormStatsTree } from 'diets'
import { useFoods } from 'foods'
import { useScreenSize, Loader, ScreenSize } from 'general'
import { useRef } from 'react'
import { HStack, Text, chakra } from '@chakra-ui/react'
import { Check } from 'react-feather'
import { usePortions } from 'portions'

const CheckStyled = chakra(Check)

type Props = {
  onBlobUpdate: (blob: Blob) => void
}

function Exporter({ onBlobUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()
  const screenSize = useScreenSize()
  const isUrlUpdatedRef = useRef(false)
  const getDietFormStatsTree = useGetDietFormStatsTree()
  const dietFormStatsTree = getDietFormStatsTree(dietForm)

  function onRender({ blob }: ReactPDF.OnRenderProps) {
    if (false === isUrlUpdatedRef.current && blob) {
      isUrlUpdatedRef.current = true
      onBlobUpdate(blob)
    }
  }

  const document = (
    <PdfDietEditor
      dietForm={dietForm}
      foodsById={foodsById}
      portionsById={portionsById}
      onRender={onRender}
      subject={JSON.stringify(dietForm)}
      dietFormStatsTree={dietFormStatsTree}
    />
  )

  if (screenSize < ScreenSize.Medium) {
    return (
      <BlobProvider document={document}>
        {({ loading }) => {
          if (loading) {
            return <Loader label="Exporting..." />
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
