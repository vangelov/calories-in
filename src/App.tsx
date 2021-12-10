import { ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'
import { FoodsStoreProvider } from 'foods'
import { loadFoods } from 'foods/persistence'
import { OneTimeCheckStoreProvider, ScreenSizeProvider } from 'general'
import { DietEditor } from 'diets'
import { useState } from 'react'
import { PortionsStoreProvider } from 'portions'
import { MealsStoreProvider } from 'meals'
import initialMeals from 'meals/meals.json'

smoothscroll.polyfill()

function App() {
  const [foods] = useState(loadFoods)

  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <OneTimeCheckStoreProvider>
          <PortionsStoreProvider>
            <FoodsStoreProvider initialFoods={foods}>
              <MealsStoreProvider initialMeals={initialMeals}>
                <MainLayout>
                  <DietEditor />
                </MainLayout>
              </MealsStoreProvider>
            </FoodsStoreProvider>
          </PortionsStoreProvider>
        </OneTimeCheckStoreProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App
