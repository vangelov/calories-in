import PdfDietEditor from 'diets/PdfDietEditor'
import { useDietForm, useGetDietFormStatsTree } from 'diets'
import { useFoods } from 'foods'
import { Loader } from 'general'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react'
import { usePortions } from 'portions'
import usePdfExport from './usePdfExport'

import { useEffect, useState } from 'react'

import Worker from 'worker'

type Props = {
  onUpdate: (blob: Blob, url: string) => void
}
const instance = new Worker()

export const onClick = (data: any) => {
  return new Promise(async resolve => {
    // Use a web worker to process the data
    const processed = await instance.processData(data)

    resolve(processed)
  })
}

const t: any = window

t.onClick = onClick

function Exporter({ onUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()
  const getDietFormStatsTree = useGetDietFormStatsTree()
  const dietFormStatsTree = getDietFormStatsTree(dietForm)
  const [g, setG] = useState('')

  console.log('fuck')
  useEffect(() => {
    console.log('f')
    setG('f')
    const test = async () => {
      setG('d1')
      const d = await onClick({
        dietForm,
        foodsById,
        portionsById,
        dietFormStatsTree,
      })
      console.log('d2', typeof d)

      const u = URL.createObjectURL(d)
      setG(u)
    }

    test()
  }, [])

  function test() {
    window.open(g, '_blank')
  }

  return (
    <div>
      {g}
      <Button onClick={test}>TF</Button>
    </div>
  )
}

export default Exporter
