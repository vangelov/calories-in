import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types/style'
import { getComputedColorFromChakra } from 'theme'
import {
  getLabelColor,
  getValueFontWeight,
  getValueTextColor,
  isForDiet,
  isForEnergy,
  isForIngredient,
  StatVariant,
} from './statsVariants'

type Props = {
  label?: string
  value: number
  valueDetail?: string
  style?: Style
  variant: StatVariant
  unit?: string
}

const UNITS_WITH_DISTANCE = ['oz', 'tsp', 'tbsp', 'fl oz', 'c']

function PdfStat({
  label,
  value,
  variant,
  valueDetail,
  unit = 'g',
  style = {},
}: Props) {
  const hasDistanceBetweenValueAndUnit = UNITS_WITH_DISTANCE.includes(unit)
  return (
    <View
      style={[
        styles.root,
        { justifyContent: isForIngredient(variant) ? 'center' : undefined },
        style,
      ]}
    >
      {isForDiet(variant) && (
        <View
          style={[
            styles.line,
            { backgroundColor: getComputedColorFromChakra('gray.300') },
          ]}
        />
      )}
      {label && (
        <Text
          style={[
            styles.label,
            { color: getComputedColorFromChakra(getLabelColor(variant)) },
          ]}
        >
          {label}
        </Text>
      )}
      <Text
        style={[
          styles.value,
          {
            color: getComputedColorFromChakra(getValueTextColor(variant)),
            fontWeight: getValueFontWeight(variant),
          },
        ]}
      >
        {value}
        {hasDistanceBetweenValueAndUnit ? ' ' : ''}
        <Text style={styles.unit}>{isForEnergy(variant) ? 'kcal' : unit}</Text>
      </Text>

      {valueDetail && <Text style={[styles.valueDetail]}>{valueDetail}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    textAlign: 'right',
    flex: 1,
  },
  label: {
    fontSize: 8,
    marginBottom: 2,
  },
  unit: {
    fontSize: 10,
  },
  value: {
    fontSize: 12,
  },
  valueDetail: {
    marginTop: '2px',
    fontSize: 10,
  },
  line: {
    position: 'absolute',
    top: '2px',
    bottom: '2px',
    right: '-10px',
    width: '1px',
  },
})

export default PdfStat
