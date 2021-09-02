import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types/style'
import { getComputedColorFromChakra } from 'theme'
import {
  getLabelColor,
  getValueFontWeight,
  getValueTextColor,
  isForEnergy,
  StatVariant,
} from './statsVariants'

type Props = {
  label?: string
  value: number
  style?: Style
  variant: StatVariant
}

function PdfStat({ label, value, variant, style = {} }: Props) {
  return (
    <View style={[styles.root, style]}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    textAlign: 'right',
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
})

export default PdfStat
