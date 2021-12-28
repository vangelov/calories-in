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
import { useEffect, useRef, useState } from 'react'
import Worker from 'worker'

const instance = new Worker()

type Props = {
  onUpdate: (blob: Blob, url: string) => void
}

function Exporter({ onUpdate }: Props) {
  const dietForm = useDietForm()
  const { foodsById } = useFoods()
  const { portionsById } = usePortions()
  const getDietFormStatsTree = useGetDietFormStatsTree()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const isUnmountedRef = useRef(false)

  useEffect(() => {
    return () => {
      isUnmountedRef.current = true
    }
  }, [])

  useEffect(() => {
    async function run() {
      const dietFormStatsTree = getDietFormStatsTree(dietForm)

      try {
        setIsLoading(true)
        const blob = await instance.processData({
          dietForm,
          dietFormStatsTree,
          foodsById,
          portionsById,
        })
        if (!isUnmountedRef.current) {
          const url = URL.createObjectURL(blob)
          onUpdate(blob, url)
        }
      } catch (error) {
        if (!isUnmountedRef.current) {
          setError(error)
        }
      } finally {
        if (!isUnmountedRef.current) {
          setIsLoading(false)
        }
      }
    }
    run()
  }, [dietForm, foodsById, portionsById, getDietFormStatsTree, onUpdate])

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
      <AlertIcon color="teal.400" boxSize="40px" mr={0} />
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
