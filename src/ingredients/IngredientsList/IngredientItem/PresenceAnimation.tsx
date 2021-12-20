import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  children: ReactNode
  shouldAnimate: boolean
  onAnimationComplete: () => void
  isVisible: boolean
  isDraggingOver?: boolean
}

const variants = {
  open: {
    opacity: 1,
    height: 'auto',
  },
  collapsed: { opacity: 0, height: 0 },
}

function PresenceAnimation({
  shouldAnimate,
  onAnimationComplete,
  isVisible,
  children,
  isDraggingOver = false,
}: Props) {
  return (
    <motion.div
      style={{ overflow: isDraggingOver ? undefined : 'hidden' }}
      transition={{ ease: 'easeInOut' }}
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
