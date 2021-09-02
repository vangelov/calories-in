import { chakra } from '@chakra-ui/react'
import { Check } from 'react-feather'
import { Menu as MenuBase, MenuItem } from 'general'
import Trigger from './Trigger'
import { useDietForm } from 'diets'

const CheckStyled = chakra(Check)

type Props = {
  onSelect: (fieldId: string, index: number) => void
}

function Menu({ onSelect }: Props) {
  const { variantsForms, selectedVariantFormIndex } = useDietForm()

  return (
    <MenuBase arrow menuButton={<Trigger />}>
      {variantsForms.map(({ name, fieldId }, index) => {
        const isSelected = index === selectedVariantFormIndex

        return (
          <MenuItem key={fieldId} onClick={() => onSelect(fieldId, index)}>
            <CheckStyled
              color={isSelected ? 'teal' : 'transparent'}
              pointerEvents="none"
              size={15}
              mr={3}
            />
            {name}
          </MenuItem>
        )
      })}
    </MenuBase>
  )
}

export default Menu
