import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function Page({ children }: Props) {
  return (
    <Box>
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  )
}

export { default as PageHeader } from './PageHeader'
export { default as PageBody } from './PageBody'
export { default as PageFooter } from './PageFooter'

export default Page
