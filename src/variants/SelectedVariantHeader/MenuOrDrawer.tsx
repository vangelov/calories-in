import { MenuOrDrawer as MenuOrDrawerBase, RightAligned } from 'general'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement[]
}

function MenuOrDrawer({ children }: Props) {
  return (
    <RightAligned>
      <MenuOrDrawerBase title="Day" variant="outline" aria-label="Day actions">
        {children}
      </MenuOrDrawerBase>
    </RightAligned>
  )
}

export default MenuOrDrawer
