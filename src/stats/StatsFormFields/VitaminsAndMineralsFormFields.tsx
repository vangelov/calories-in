import { VStack, BoxProps, Divider } from '@chakra-ui/layout'
import { NutritionData, getUnit } from 'stats'
import StatFormField from './StatFormField'
import useGetDailyValuePercent from './useGetDailyValuePercent'
import useGetValue from './useGetValue'

type Props = {
  canEdit: boolean
} & BoxProps

type FieldData = {
  name: keyof NutritionData
  label: string
  labelDetail?: string
}

const fieldsData: FieldData[] = [
  { name: 'vitaminA', label: 'Vitamin A' },
  { name: 'vitaminB1', label: 'Vitamin B1', labelDetail: '(thiamin)' },
  { name: 'vitaminB2', label: 'Vitamin B2', labelDetail: '(riboflavin)' },
  { name: 'vitaminB3', label: 'Vitamin B3', labelDetail: '(niacin)' },
  { name: 'vitaminB5', label: 'Vitamin B5', labelDetail: '(pantothenic acid)' },
  { name: 'vitaminB6', label: 'Vitamin B6' },
  { name: 'vitaminB9', label: 'Vitamin B9', labelDetail: '(folate)' },
  { name: 'vitaminB12', label: 'Vitamin B12' },
  { name: 'vitaminC', label: 'Vitamin C' },
  { name: 'vitaminD', label: 'Vitamin D' },
  { name: 'vitaminE', label: 'Vitamin E', labelDetail: '(alpha-tocopherol)' },
  { name: 'vitaminK', label: 'Vitamin K', labelDetail: '(phylloquinone)' },
  { name: 'magnesium', label: 'Magnesium' },
  { name: 'calcium', label: 'Calcium' },
  { name: 'phosphorus', label: 'Phosphorus' },
  { name: 'potassium', label: 'Potassium' },
  { name: 'iron', label: 'Iron' },
  { name: 'selenium', label: 'Selenium' },
  { name: 'zinc', label: 'Zinc' },
  { name: 'manganese', label: 'Manganese' },
  { name: 'copper', label: 'Copper' },
]

function VitaminsAndMinerals({ canEdit, ...rest }: Props) {
  const getValue = useGetValue()
  const getDailyValuePercent = useGetDailyValuePercent()

  const fieldsDataToShow = canEdit
    ? fieldsData
    : fieldsData.filter(({ name }) => getValue(name) > 0)

  if (fieldsDataToShow.length === 0) {
    return null
  }

  return (
    <>
      <Divider size="md" mt={2} />
      <VStack
        spacing={2}
        alignItems="flex-start"
        {...rest}
        divider={<Divider />}
      >
        {fieldsDataToShow.map(({ name, label, labelDetail }) => (
          <StatFormField
            key={name}
            name={name}
            label={label}
            inputType="nutritionValue"
            nutritionValueUnit={getUnit(name)}
            labelDetail={labelDetail}
            isReadOnly={!canEdit}
            dailyValuePercent={getDailyValuePercent(name)}
            hasDivider={false}
            formLabelProps={{ fontWeight: 'normal' }}
          />
        ))}
      </VStack>
    </>
  )
}

export default VitaminsAndMinerals
