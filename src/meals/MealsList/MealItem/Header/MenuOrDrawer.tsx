import { RightAligned } from 'layout'
import { MenuOrDrawer as MenuOrDrawerBase } from 'general'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement[]
}

function MenuOrDrawer({ children }: Props) {
  return (
    <RightAligned>
      <MenuOrDrawerBase
        mr={3}
        title="Meal"
        variant="ghost"
        _hover={{ backgroundColor: 'gray.200' }}
        aria-label="Meal actions"
      >
        {children}
      </MenuOrDrawerBase>
    </RightAligned>
  )
}

export default MenuOrDrawer
