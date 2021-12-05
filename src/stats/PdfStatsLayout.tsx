import { View, StyleSheet } from '@react-pdf/renderer'
import { ReactElement } from 'react'

type Props = {
  nameElement: ReactElement

  energyElement: ReactElement
  proteinElement: ReactElement
  carbsElement: ReactElement
  fatElement: ReactElement
}

function PdfStatsLayout({
  nameElement,

  energyElement,
  proteinElement,
  carbsElement,
  fatElement,
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.name}>{nameElement}</View>
      <View style={styles.macro}>{energyElement}</View>
      <View style={styles.macro}>{proteinElement}</View>
      <View style={styles.macro}>{carbsElement}</View>
      <View style={styles.macro}>{fatElement}</View>
    </View>
  )
}

const NAME_WIDTH = '50%'
const MACROS_COUNT = 4
const MACRO_WIDTH = `${(100 - parseInt(NAME_WIDTH, 10)) / MACROS_COUNT}%`

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  name: {
    width: NAME_WIDTH,
    justifyContent: 'center',
  },
  macro: {
    width: MACRO_WIDTH,
    marginRight: 12,
  },
})

export default PdfStatsLayout
