import { useDietForm, useGetDietFormStatsTree } from 'diets'
import { useFoods } from 'foods'
import { usePortions } from 'portions'
import { useEffect, useState } from 'react'
import Worker from './worker'
import { minDelay, useRunIfNotUnmounted } from 'general'

const worker = new Worker()

type Params = {
  onUpdate: (blob: Blob, url: string) => void
}

function usePdfExport({ onUpdate }: Params) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()
  const getDietFormStatsTree = useGetDietFormStatsTree()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>()

  const runIfNotUnmounted = useRunIfNotUnmounted()

  useEffect(() => {
    async function run() {
      const dietFormStatsTree = getDietFormStatsTree(dietForm)
      const startDate = new Date()

      try {
        setIsLoading(true)
        const blob = await worker.getDietPdfBlob({
          dietForm,
          dietFormStatsTree,
          foodsById,
          portionsById,
        })

        await minDelay(startDate)

        runIfNotUnmounted(() => {
          setIsLoading(false)
          const url = URL.createObjectURL(blob)
          onUpdate(blob, url)
        })
      } catch (error) {
        await minDelay(startDate)

        runIfNotUnmounted(() => {
          setIsLoading(false)
          setError(error)
        })
      }
    }
    run()
  }, [
    dietForm,
    foodsById,
    portionsById,
    getDietFormStatsTree,
    onUpdate,
    runIfNotUnmounted,
  ])

  return {
    isLoading,
    error,
  }
}

export default usePdfExport
