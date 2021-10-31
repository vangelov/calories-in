import { SelectProps, Select } from '@chakra-ui/select'
import { Portion } from 'portions'
import { ForwardedRef, forwardRef } from 'react'

type Props = {
  forwardedRef?: ForwardedRef<HTMLSelectElement>
  portions: Portion[]
} & SelectProps

function PortionsSelect({ children, forwardedRef, portions, ...rest }: Props) {
  return (
    <Select focusBorderColor="teal.500" size="md" ref={forwardedRef} {...rest}>
      {children}
      {portions.map(({ id, singular, millilitersPerAmount }) => (
        <option key={id} value={id}>
          {singular}
          {id !== 'milliliters' && ` (${millilitersPerAmount} ml)`}
        </option>
      ))}
    </Select>
  )
}

export default forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <PortionsSelect forwardedRef={ref} {...props} />
))
