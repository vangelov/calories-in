import { Box, ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import builInFoods from 'foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'
import { ScreenSizeProvider } from 'general'
import { FoodsStoreProvider } from 'foods'
import { OneTimeCheckStoreProvider } from 'general/oneTimeCheck'
import { DietEditor } from 'diets'
import { PDFViewer } from '@react-pdf/renderer'
import ReactPDF from '@react-pdf/renderer'

import React from 'react'
import {
  BlobProvider,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  usePDF,
} from '@react-pdf/renderer'
import PdfStat from 'stats/PdfStat'
import PdfStatsLayout from 'stats/PdfStatsLayout'
import { IngredientForm, IngredientsList } from 'ingredients'
import PdfIngredientItem from 'ingredients/PdfIngredientsList/PdfIngredientItem'
import PdfIngredientsList from 'ingredients/PdfIngredientsList'
import { MealForm } from 'meals'
import PdfMealsList from 'meals/PdfMealsList'
import PdfVariantsList from 'variants/PdfVariantsList'

smoothscroll.polyfill()

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Roboto',
  },
})

const variantsForms = [
  {
    name: 'V1',
    fieldId: 'v1',
    mealsForms: [
      {
        fieldId: 'm1',
        name: 'Breakfast',
        ingredientsForms: [
          { fieldId: 'i1', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i2', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i3', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i4', foodId: 1, amountInGrams: '43' },
        ],
      },

      {
        fieldId: 'm2',
        name: 'Breakfast',
        ingredientsForms: [
          { fieldId: 'i5', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i6', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i7', foodId: 1, amountInGrams: '43' },
        ],
      },
      {
        fieldId: 'm3',
        name: 'Breakfast',
        ingredientsForms: [
          { fieldId: 'i8', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i9', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i10', foodId: 1, amountInGrams: '43' },
        ],
      },
      {
        fieldId: 'm4',
        name: 'Breakfast',
        ingredientsForms: [
          { fieldId: 'i11', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i12', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i13', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i14', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i15', foodId: 1, amountInGrams: '43' },
        ],
      },
      {
        fieldId: 'm4',
        name: 'Breakfast',
        ingredientsForms: [
          { fieldId: 'i11', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i12', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i13', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i14', foodId: 1, amountInGrams: '43' },
          { fieldId: 'i15', foodId: 1, amountInGrams: '43' },
        ],
      },
    ],
  },
]

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <PdfVariantsList variantsForms={variantsForms} />
    </Page>
  </Document>
)

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src:
        'https://fontlibrary.org/assets/fonts/roboto/4f8c3c9bbdde908a86daabfe666d2f61/7b5fb88f12bec8143f00e21bc3222124/RobotoLight.ttf',
      fontWeight: 'light',
    },
    {
      src:
        'https://fontlibrary.org/assets/fonts/roboto/4f8c3c9bbdde908a86daabfe666d2f61/fe13e4170719c2fc586501e777bde143/RobotoMedium.ttf',
      fontWeight: 'medium',
    },
  ],
})

const App = () => {
  return (
    <PDFViewer width="100%" height="700px">
      <MyDocument />
    </PDFViewer>
  )
}

export default App
