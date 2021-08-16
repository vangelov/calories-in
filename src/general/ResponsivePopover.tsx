import { ReactElement, ReactNode } from 'react'
import { useScreenSize } from './ScreenSizeProvider'

type Props = {
  trigger: ReactElement
  title: string
  children: ReactNode
  footer: ReactNode
}

function PopoverOrModal({ children }: Props) {
  const screenSize = useScreenSize()

  if (screenSize > 2) {
  }
}
