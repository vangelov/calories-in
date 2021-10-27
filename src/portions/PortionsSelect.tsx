import { SelectProps, Select } from '@chakra-ui/select'
import { ForwardedRef, forwardRef } from 'react'
import { usePortions } from 'portions'

type Props = { forwardedRef?: ForwardedRef<HTMLSelectElement> } & SelectProps

function PortionsSelect({ children, forwardedRef, ...rest }: Props) {
  const { portions } = usePortions()

  console.log('re', rest)

  return (
    <Select focusBorderColor="teal.500" size="md" ref={forwardedRef} {...rest}>
      {children}
      {portions.map(({ id, singular }) => (
        <option key={id} value={id}>
          {singular}
        </option>
      ))}
    </Select>
  )
}

export default forwardRef<HTMLSelectElement, Props>((props, ref) => (
  <PortionsSelect forwardedRef={ref} {...props} />
))
