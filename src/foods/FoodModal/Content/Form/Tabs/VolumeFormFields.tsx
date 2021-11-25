import { Flex, Text, HStack, Alert, AlertIcon } from '@chakra-ui/react'
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
  const { portionsById, volumeBasedPortions } = usePortions()
  const portion = food?.volume ? portionsById[food.volume.portionId] : undefined

  return (
    <Flex minHeight={canEdit ? '200px' : undefined} flexDirection="column">
      {canEdit && (
        <Alert status="info" mb={3}>
          <AlertIcon color="teal.400" />
          Enter the food weight in grams per some volume measurement if you want
          to convert between weight and volume (for example: between grams and
          cups).
        </Alert>
      )}

      <HStack spacing={2}>
        {canEdit && <Text fontWeight="medium">1 x</Text>}
        {canEdit ? (
          <PortionsSelect
            width="200px"
            portions={volumeBasedPortions}
            {...register('volumeForm.portionId')}
          />
        ) : (
          <Text fontWeight="medium">
            1 x {`${portion?.singular} (${portion?.millilitersPerAmount} ml)`}
          </Text>
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
