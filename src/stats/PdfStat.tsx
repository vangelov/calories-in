import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types/style'
import { getComputedColorFromChakra } from 'theme'
import {
  getLabelColor,
  getValueFontWeight,
  getValueTextColor,
  isForDiet,
  isForEnergy,
  StatVariant,
} from './statsVariants'

type Props = {
  label?: string
  value: number
  valueDetail?: string
  style?: Style
  variant: StatVariant
}

function PdfStat({ label, value, variant, valueDetail, style = {} }: Props) {
  return (
    <View style={[styles.root, style]}>
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
        <Text style={styles.unit}>{isForEnergy(variant) ? 'kcal' : 'g'}</Text>
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
    fontSize: 10,
    marginBottom: 2,
  },
  unit: {
    fontSize: 12,
  },
  value: {
    fontSize: 14,
  },
  valueDetail: {
    marginTop: '2px',
    fontSize: 12,
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
