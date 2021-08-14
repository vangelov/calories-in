import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
  shouldAnimate: boolean
  children: ReactNode
}

const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  hidden: { opacity: 0, scale: 0.9 },
}

function AnimateAppear({ shouldAnimate, children }: Props) {
  return (
    <motion.div
      transition={{
        ease: 'easeInOut',
        duration: shouldAnimate ? 0.35 : undefined,
        delay: 0.5,
      }}
      initial={shouldAnimate ? 'hidden' : false}
      animate="open"
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default AnimateAppear
