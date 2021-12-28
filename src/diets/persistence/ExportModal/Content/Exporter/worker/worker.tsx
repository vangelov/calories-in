import { pdf } from '@react-pdf/renderer'

if (process.env.NODE_ENV !== 'production') {
  const t: any = global
  t.$RefreshReg$ = () => {}
  t.$RefreshSig$ = () => () => {}
}

async function getDietPdfBlob(data: any) {
  const PdfDietEditor = require('diets/PdfDietEditor').default

  const document = (
    <PdfDietEditor
      dietForm={data.dietForm}
      foodsById={data.foodsById}
      portionsById={data.portionsById}
      subject={JSON.stringify(data.dietForm)}
      dietFormStatsTree={data.dietFormStatsTree}
    />
  )

  return pdf(document).toBlob()
}

export { getDietPdfBlob }
