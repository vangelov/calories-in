import { chakra } from '@chakra-ui/react'
import { Check } from 'react-feather'
import { Menu as MenuBase, MenuItem } from 'general'
import Trigger from './Trigger'
import { Portion, usePortions } from 'portions'

const CheckStyled = chakra(Check)

type Props = {
  selectedPortionId: string
  onChange: (portion: Portion) => void
}

function Menu({ onChange, selectedPortionId }: Props) {
  const { portions } = usePortions()

  return (
    <MenuBase
      portal={true}
      overflow="auto"
      position="anchor"
      viewScroll="close"
      arrow
      menuButton={<Trigger selectedPortionId={selectedPortionId} />}
    >
      {portions.map(portion => {
        const { id, unit } = portion
        const isSelected = id === selectedPortionId

        return (
          <MenuItem key={id} onClick={() => onChange(portion)}>
            <CheckStyled
              color={isSelected ? 'teal' : 'transparent'}
              pointerEvents="none"
              size={15}
              mr={3}
            />
            {unit}
          </MenuItem>
        )
      })}
    </MenuBase>
  )
}

export default Menu
