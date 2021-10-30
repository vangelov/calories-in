import { SelectProps, Select } from '@chakra-ui/select'
import { ForwardedRef, forwardRef } from 'react'
import usePortionsForType, { PortionsType } from './usePortionsForType'

type Props = {
  type?: PortionsType
  forwardedRef?: ForwardedRef<HTMLSelectElement>
} & SelectProps

function PortionsSelect({
  type = 'all',
  children,
  forwardedRef,
  ...rest
}: Props) {
  const portions = usePortionsForType(type)

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
