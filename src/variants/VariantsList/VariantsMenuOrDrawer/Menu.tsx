import { chakra } from '@chakra-ui/react'
import { Check } from 'react-feather'
import { Menu as MenuBase, MenuItem } from 'general'
import Trigger from './Trigger'
import { useDietForm } from 'diets'
import { VariantForm } from 'variants'

const CheckStyled = chakra(Check)

type Props = {
  onSelect: (variantForm: VariantForm, index: number) => void
}

function Menu({ onSelect }: Props) {
  const { variantsForms, selectedVariantFormIndex } = useDietForm()

  return (
    <MenuBase arrow menuButton={<Trigger />}>
      {variantsForms.map((variantForm, index) => {
        const { fieldId, name } = variantForm
        const isSelected = index === selectedVariantFormIndex

        return (
          <MenuItem key={fieldId} onClick={() => onSelect(variantForm, index)}>
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
