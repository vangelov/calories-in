import { SelectProps, Select } from '@chakra-ui/select'
import foodCategories from './categories.json'
import { ForwardedRef, forwardRef } from 'react'

type Props = { forwardedRef?: ForwardedRef<HTMLSelectElement> } & SelectProps

function FoodCategoriesSelect({ children, forwardedRef, ...rest }: Props) {
  return (
    <Select focusBorderColor="teal.500" size="md" ref={forwardedRef} {...rest}>
      {children}
      {foodCategories.map(category => (
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
