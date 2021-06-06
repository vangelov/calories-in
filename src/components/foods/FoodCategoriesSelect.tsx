import { SelectProps, Select } from '@chakra-ui/select'
import { FOODS_CATEGORIES } from 'core/foodsCategories'
import { ForwardedRef, forwardRef } from 'react'

type Props = { forwardedRef?: ForwardedRef<HTMLSelectElement> } & SelectProps

function FoodCategoriesSelect({ children, forwardedRef, ...rest }: Props) {
  return (
    <Select
      focusBorderColor="custom.500"
      size="md"
      ref={forwardedRef}
      {...rest}
    >
      {children}
      {FOODS_CATEGORIES.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  )
}

export default forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <FoodCategoriesSelect forwardedRef={ref} {...props} />
))
