import StatFormField, { StatFormFieldProps } from './StatFormField'
import { Flex, Text } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { PortionsSelect, usePortions } from 'portions'
import { FoodForm } from 'foods'

type Props = {} & StatFormFieldProps

function WeightFormField({ label, children, ...rest }: Props) {
  const { getValues } = useFormContext<FoodForm>()
  const { portionsById } = usePortions()
  const { register } = useFormContext()

  return (
    <StatFormField
      labelElement={
        rest.isReadOnly ? (
          `Weight for a ${portionsById[getValues().weightPortionId].singular}`
        ) : (
          <Flex alignItems="center">
            <Text flexShrink={0} mr={1}>
              Weight for a
            </Text>
            <PortionsSelect {...register('weightPortionId')} />
          </Flex>
        )
      }
      {...rest}
    >
      {children}
    </StatFormField>
  )
}

export default WeightFormField
