import 'focus-visible/dist/focus-visible'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm } from 'diets'
import { useFoods } from 'foods'

type Props = {
  onUrlUpdate: (url: string) => void
}

function Preview({ onUrlUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()

  function onRender({ blob }: ReactPDF.OnRenderProps) {
    const url = URL.createObjectURL(blob)
    onUrlUpdate(url)
  }

  return (
    <PDFViewer showToolbar={false} width="100%" height="300px">
      <PdfDietEditor
        dietForm={dietForm}
        foodsById={foodsById}
        onRender={onRender}
        subject={JSON.stringify(dietForm)}
      />
    </PDFViewer>
  )
}

export default Preview
