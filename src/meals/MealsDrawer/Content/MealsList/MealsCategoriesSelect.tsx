import { SelectProps, Select } from '@chakra-ui/select'
import { ForwardedRef, forwardRef } from 'react'

type Props = { forwardedRef?: ForwardedRef<HTMLSelectElement> } & SelectProps

const categories = [
  { name: 'Cat 1', id: 1 },
  { name: 'Cat 2', id: 2 },
]

function MealsCategoriesSelect({ children, forwardedRef, ...rest }: Props) {
  return (
    <Select focusBorderColor="teal.500" size="md" ref={forwardedRef} {...rest}>
      {children}
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  )
}

export default forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <MealsCategoriesSelect forwardedRef={ref} {...props} />
))
