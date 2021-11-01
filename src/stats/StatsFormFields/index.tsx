import { FlexProps, Text, Flex, Box, Divider } from '@chakra-ui/react'
import MacrosFormFields from './MacrosFormFields'
import VitaminsAndMineralsFormFields from './VitaminsAndMineralsFormFields'

type Props = {
  canEdit: boolean
  showsEnergyPrecentFromFat?: boolean
} & FlexProps

function StatsFormFields({
  canEdit,
  showsEnergyPrecentFromFat = false,
}: Props) {
  return (
    <Box>
      {!canEdit && (
        <>
          <Divider size="md" />
          <Flex justifyContent="flex-end" py={2}>
            <Text fontSize="sm" fontWeight="medium">
              % Daily Value *
            </Text>
          </Flex>
        </>
      )}

      <MacrosFormFields
        canEdit={canEdit}
        showsEnergyPercentFromFats={showsEnergyPrecentFromFat}
      />

      <VitaminsAndMineralsFormFields canEdit={canEdit} mt={2} />

      {!canEdit && (
        <Box>
          <Divider my={2} borderColor="gray.400" />
          <Text fontSize="sm">
            * The % Daily Value (DV) tells you how much a nutrient in a serving
            of food contributes to a daily diet. 2000 calories a day is used for
            general nutrition advise.{' '}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export { default as StatFormField } from './StatFormField'

export default StatsFormFields
