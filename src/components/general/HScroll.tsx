import React, { ForwardedRef, ReactNode, forwardRef, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useMergeRefs } from '@chakra-ui/hooks'

type ShadowProps = {
  showStart: boolean
  showEnd: boolean
}

const Shadow = styled.div<ShadowProps>`
  position: relative;
  flex: 1;
  overflow: hidden;

  ${props =>
    props.showStart
      ? css`
          ::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 50px;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 1),
              rgba(255, 255, 255, 0)
            );
            z-index: 1;
          }
        `
      : ''}
  ${props =>
    props.showEnd
      ? css`
          ::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 50px;
            background: linear-gradient(
              to left,
              rgba(255, 255, 255, 1),
              rgba(255, 255, 255, 0)
            );
            z-index: 1;
          }
        `
      : ''}
`

const Container = styled.div`
  display: flex;
  overflow: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`

type Props = {
  children: ReactNode
  forwardRef?: ForwardedRef<HTMLDivElement>
}

const HScroll = ({ children, forwardRef }: Props) => {
  const [showStart, setShowStart] = React.useState(false)
  const [showEnd, setShowEnd] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number>()

  const onMousewheel = (event: WheelEvent) => {
    const { deltaX } = event

    if ((deltaX < 0 && !showStart) || (deltaX > 0 && !showEnd)) {
      event.preventDefault()
    }
  }

  const onScroll = () => {
    const { scrollWidth = 0, scrollLeft = 0, offsetWidth = 0 } =
      ref.current || {}

    setShowStart(scrollLeft > 0)
    setShowEnd(scrollLeft + offsetWidth + 1 < scrollWidth)
  }

  const node = ref.current

  React.useEffect(() => {
    onScroll()

    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(onScroll, 300)

    node?.addEventListener('scroll', onScroll)
    node?.addEventListener('wheel', onMousewheel)
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('resize', onScroll)
      node?.removeEventListener('scroll', onScroll)
      node?.removeEventListener('wheel', onMousewheel)

      window.clearTimeout(timeoutRef.current)
    }
  })

  const m = useMergeRefs(ref, forwardRef)

  return (
    <Shadow showEnd={showEnd} showStart={showStart}>
      <Container ref={m}>{children}</Container>
    </Shadow>
  )
}

export default forwardRef<HTMLDivElement, Props>((props, ref) => (
  <HScroll {...props} forwardRef={ref} />
))
