import { chakra } from '@chakra-ui/react'
import { Check } from 'react-feather'
import { Menu as MenuBase, MenuItem } from 'general'
import Trigger from './Trigger'
import { Portion, usePortions } from 'portions'

const CheckStyled = chakra(Check)

type Props = {
  selectedPortionId: string
  onSelect: (portion: Portion) => void
}

function Menu({ onSelect, selectedPortionId }: Props) {
  const { portions } = usePortions()

  return (
    <MenuBase portal={true} arrow menuButton={<Trigger />}>
      {portions.map(portion => {
        const { id, unit } = portion
        const isSelected = id === selectedPortionId

        return (
          <MenuItem key={id} onClick={() => onSelect(portion)}>
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
