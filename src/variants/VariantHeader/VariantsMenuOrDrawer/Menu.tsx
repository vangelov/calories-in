import { chakra } from '@chakra-ui/react'
import { Check, Plus, Shuffle } from 'react-feather'
import { Menu as MenuBase, MenuItem, MenuDivider } from 'general'
import Trigger from './Trigger'
import { useDietForm } from 'diets'
import { VariantForm } from 'variants'

const CheckStyled = chakra(Check)
const PlusStyled = chakra(Plus)
const ShuffleStyled = chakra(Shuffle)

type Props = {
  onSelect: (variantForm: VariantForm, index: number) => void
  onCreate: () => void
}

function Menu({ onSelect, onCreate }: Props) {
  const { variantsForms, selectedVariantFormIndex } = useDietForm()

  return (
    <MenuBase arrow menuButton={<Trigger />}>
      {variantsForms.map((variantForm, index) => {
        const { fieldId, name } = variantForm
        const isSelected = index === selectedVariantFormIndex

        return (
          <MenuItem
            styles={{ color: isSelected ? 'teal' : undefined }}
            key={fieldId}
            onClick={() => onSelect(variantForm, index)}
          >
            <CheckStyled
              color={isSelected ? 'teal' : 'transparent'}
              pointerEvents="none"
              size={16}
              mr={3}
            />
            {name}
          </MenuItem>
        )
      })}
      <MenuDivider />
      <MenuItem onClick={onCreate}>
        <PlusStyled pointerEvents="none" size={16} mr={3} />
        Create new
      </MenuItem>
      <MenuItem onClick={onCreate}>
        <ShuffleStyled pointerEvents="none" size={16} mr={3} />
        Re-order
      </MenuItem>
    </MenuBase>
  )
}

export default Menu
