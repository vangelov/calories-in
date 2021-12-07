import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

type ShadowProps = {
  hasStartFade: boolean
  hasEndFade: boolean
  children: ReactNode
}

function getLinearGradient(direction: 'left' | 'right') {
  return `linear-gradient(to ${direction},#F7FAFC, rgba(255, 255, 255, 0))`
}

const shadowElementBase = {
  content: '""',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '50px',
  zIndex: 1,
}

function FadeBox({ hasStartFade, hasEndFade, children }: ShadowProps) {
  const before = {
    ...shadowElementBase,
    left: 0,
    background: getLinearGradient('right'),
  }

  const after = {
    ...shadowElementBase,
    right: 0,
    background: getLinearGradient('left'),
  }

  return (
    <Box
      position="relative"
      flex={1}
      overflow="hidden"
      _before={hasStartFade ? before : undefined}
      _after={hasEndFade ? after : undefined}
    >
      {children}
    </Box>
  )
}

export default FadeBox
