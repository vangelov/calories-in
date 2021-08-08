import { animate } from 'framer-motion'
import { RefObject } from 'react'

function animateScrollLeft(nodeRef: RefObject<HTMLDivElement>, delta: number) {
  if (!nodeRef.current) {
    return
  }

  const node = nodeRef.current

  animate(node.scrollLeft, node.scrollLeft + delta, {
    duration: 0.2,
    onUpdate: value => {
      node.scrollLeft = value
    },
  })
}

export default animateScrollLeft
