import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  shouldAnimate: boolean
  onAnimationComplete: () => void
  isVisible: boolean
  isDragging: boolean
}

const variants = {
  open: {
    opacity: 1,
    height: 'auto',
  },

  collapsed: { opacity: 0, height: 0, x: 0 },
}

function PresenceAnimation({
  children,
  onAnimationComplete,
  shouldAnimate,
  isVisible,
  isDragging,
}: Props) {
  return (
    <motion.div
      style={{ overflow: isDragging ? undefined : 'hidden' }}
      transition={{
        ease: 'easeInOut',
      }}
      initial={shouldAnimate ? 'collapsed' : false}
      animate={isVisible ? 'open' : 'collapsed'}
      onAnimationComplete={onAnimationComplete}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export default PresenceAnimation
