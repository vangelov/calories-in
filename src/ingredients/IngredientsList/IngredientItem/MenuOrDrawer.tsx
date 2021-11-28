import { RightAligned } from 'layout'
import { MenuOrDrawer as MenuOrDrawerBase } from 'general'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement[]
}

function MenuOrDrawer({ children }: Props) {
  return (
    <RightAligned>
      <MenuOrDrawerBase mr={3} title="Food">
        {children}
      </MenuOrDrawerBase>
    </RightAligned>
  )
}

export default MenuOrDrawer
