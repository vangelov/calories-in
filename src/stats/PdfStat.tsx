import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { Style } from '@react-pdf/types/style'

type Props = {
  label?: string
  value: number
  style?: Style
}

function PdfStat({ label, value, style = {} }: Props) {
  return (
    <View style={[styles.root, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Text style={styles.value}>
        {value}
        <Text style={styles.unit}>g</Text>
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
