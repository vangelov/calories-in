import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

type Props = {
  shouldAnimate: boolean
}

function DisappearingBox({ shouldAnimate }: Props) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '0',
        width: '100%',
        height: '100%',
      }}
      transition={{
        ease: 'easeInOut',
        duration: shouldAnimate ? 2 : undefined,
        delay: 0.85,
      }}
      initial={shouldAnimate ? { opacity: 1 } : false}
      animate={{ opacity: 0 }}
    >
      <Box
        position="absolute"
        left="0"
        bg="gray.50"
        right="0"
        top="0"
        bottom="0"
      />
    </motion.div>
  )
}

export default DisappearingBox
