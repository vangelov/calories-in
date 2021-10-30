import { Flex, Text, HStack } from '@chakra-ui/layout'
import { Food, FoodForm } from 'foods'
import { PortionsSelect, usePortions } from 'portions'
import { Controller, useFormContext } from 'react-hook-form'
import { AmountInput } from 'stats'

type Props = {
  canEdit: boolean
  food?: Food
}

function VolumeFields({ canEdit, food }: Props) {
  const { register } = useFormContext<FoodForm>()
  const { portionsById } = usePortions()
  const portion = food?.volume ? portionsById[food.volume.portionId] : undefined

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize="sm" mb={6} color="gray.600">
        To convert between weight- and volume-based units, specify the weight of
        this food in grams for some volume measurement:
      </Text>

      <HStack spacing={2}>
        <Text fontWeight="medium">1</Text>
        {canEdit ? (
          <PortionsSelect
            width="200px"
            type="volumeBased"
            {...register('volumeForm.portionId')}
          />
        ) : (
          <Text fontWeight="medium">{`${portion?.singular} (${portion?.millilitersPerAmount} ml)`}</Text>
        )}

        <Text fontWeight="medium">=</Text>
        <HStack spacing={1} alignItems="center">
          {canEdit ? (
            <Controller
              name="volumeForm.weightInGrams"
              render={({ field }) => (
                <AmountInput value={field.value} onChange={field.onChange} />
              )}
            />
          ) : (
            <Text>{food?.volume?.weightInGrams}g</Text>
          )}
          {canEdit && <Text textColor="gray.500">g</Text>}
        </HStack>
      </HStack>
    </Flex>
  )
}

export default VolumeFields
