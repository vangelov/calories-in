import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  shouldAnimate: boolean
  onAnimationComplete: () => void
  isVisible: boolean
}

const variants = {
  open: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
  collapsed: { opacity: 0, height: 0, x: 0 },
}

function PresenceAnimation({
  children,
  onAnimationComplete,
  shouldAnimate,
  isVisible,
}: Props) {
  return (
    <motion.div
      style={{ overflow: 'hidden' }}
      transition={{
        ease: 'easeInOut',
        duration: 4,
      }}
      initial={shouldAnimate ? 'hidden' : false}
      animate={isVisible ? 'open' : 'collapsed'}
      onAnimationComplete={onAnimationComplete}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default PresenceAnimation
