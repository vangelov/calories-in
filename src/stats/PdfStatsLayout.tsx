import { View, StyleSheet } from '@react-pdf/renderer'
import { cloneElement } from 'react'
import { ReactElement } from 'react'
import { Style } from '@react-pdf/types/style'
import PdfStat from './PdfStat'

type Props = {
  nameElement: ReactElement
  amountElement?: ReactElement
  energyElement: ReactElement
  proteinElement: ReactElement
  carbsElement: ReactElement
  fatElement: ReactElement
}

function cloneElementWithStyle(element: ReactElement, style: Style) {
  const { props } = element

  return cloneElement(element, {
    style: { ...props.style, ...style },
  })
}

function PdfStatsLayout({
  nameElement,
  amountElement = <View style={{ textAlign: 'right' }} />,
  energyElement,
  proteinElement,
  carbsElement,
  fatElement,
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.name}>{nameElement}</View>
      <View style={styles.macro}>{amountElement}</View>
      <View style={styles.macro}>{energyElement}</View>
      <View style={styles.macro}>{proteinElement}</View>
      <View style={styles.macro}>{carbsElement}</View>
      <View style={styles.macro}>{fatElement}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  name: {
    width: '30%',

    justifyContent: 'flex-end',
  },
  macro: {
    width: '14%',

    marginRight: 10,
  },
})

export default PdfStatsLayout
