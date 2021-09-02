import { Box, ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import builInFoods from 'foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'

import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'

import PdfDietEditor from 'diets/PdfDietEditor'
import { DietForm } from 'diets'
import { Food } from 'foods'
import { objectFromNutritionDataKeys } from 'stats'

smoothscroll.polyfill()

const foodsById = {
  1: {
    name: 'test',
    ...objectFromNutritionDataKeys(key => 10),
    servingSizeInGrams: 100,
  } as Food,
}

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

const dietForm: DietForm = {
  formId: '1',
  selectedVariantFormIndex: 0,
  name: 'test',
  variantsForms,
}

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <PDFViewer width="100%" height="700px">
        <PdfDietEditor dietForm={dietForm} foodsById={foodsById} />
      </PDFViewer>
    </ChakraProvider>
  )
}

export default App
/*
import { ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import builInFoods from 'foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'
import { ScreenSizeProvider } from 'general'
import { FoodsStoreProvider } from 'foods'
import { OneTimeCheckStoreProvider } from 'general/oneTimeCheck'
import { DietEditor } from 'diets'

smoothscroll.polyfill()

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <FoodsStoreProvider initialFoods={builInFoods}>
          <OneTimeCheckStoreProvider>
            <MainLayout>
              <DietEditor />
            </MainLayout>
          </OneTimeCheckStoreProvider>
        </FoodsStoreProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App*/
