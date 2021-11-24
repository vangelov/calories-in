import { chakra, Text } from '@chakra-ui/react'
import { Check } from 'react-feather'
import { Menu as MenuBase, MenuItem } from 'general'
import Trigger from './Trigger'
import { getPortionDescription, Portion } from 'portions'

const CheckStyled = chakra(Check)

type Props = {
  selectedPortionId: string
  onChange: (portion: Portion) => void
  portions: Portion[]
}

function Menu({ portions, onChange, selectedPortionId }: Props) {
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
            <Text
              color={isSelected ? 'teal.600' : undefined}
              fontWeight="500"
              fontSize="sm"
            >
              {unit}{' '}
              <Text
                as="span"
                fontWeight="normal"
                color={isSelected ? 'teal.600' : 'gray.500'}
              >
                {getPortionDescription(portion)}
              </Text>
            </Text>
          </MenuItem>
        )
      })}
    </MenuBase>
  )
}

export default Menu
