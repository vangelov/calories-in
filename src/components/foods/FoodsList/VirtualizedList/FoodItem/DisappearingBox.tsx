import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  shouldAnimate: boolean
}

function DisappearingBox({ shouldAnimate }: Props) {
  const [opacity, setOpacity] = useState(shouldAnimate ? 1 : 0)

  useEffect(() => {
    if (shouldAnimate) {
      setOpacity(0)
    }
  }, [shouldAnimate])

  return (
    <Box
      position="absolute"
      left="0"
      bg="gray.100"
      right="0"
      top="0"
      bottom="0"
      opacity={opacity}
      transition="opacity 2s ease-in-out"
    />
  )
}

export default DisappearingBox
