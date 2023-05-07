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
    width: 'auto',
    x: 0,
  },
  collapsed: { opacity: 0, width: 0, x: 0 },
}

function PresenceAnimation({
  shouldAnimate,
  isVisible,
  onAnimationComplete,
  children,
}: Props) {
  return (
    <motion.div
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
