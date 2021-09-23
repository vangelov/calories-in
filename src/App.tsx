import { ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'
import { ScreenSizeProvider } from 'general'
import { FoodsStoreProvider } from 'foods'
import { OneTimeCheckStoreProvider } from 'general/oneTimeCheck'
import { DietEditor } from 'diets'
import { loadFoods, loadFoodsFilter } from 'persistence'
import { useState } from 'react'
import { FoodsFilterStoreProvider } from 'foods-filters'

smoothscroll.polyfill()

function App() {
  const [foods] = useState(loadFoods)
  const [foodsFilter] = useState(loadFoodsFilter)

  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <OneTimeCheckStoreProvider>
          <FoodsFilterStoreProvider initialFilter={foodsFilter}>
            <FoodsStoreProvider initialFoods={foods}>
              <MainLayout>
                <DietEditor />
              </MainLayout>
            </FoodsStoreProvider>
          </FoodsFilterStoreProvider>
        </OneTimeCheckStoreProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App
