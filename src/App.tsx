import { ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'
import { ScreenSizeProvider } from 'general'
import { FoodsStoreProvider } from 'foods'
import { OneTimeCheckStoreProvider } from 'general/oneTimeCheck'
import { DietEditor } from 'diets'
import { useLoadFoods } from 'persistence'

smoothscroll.polyfill()

function App() {
  const foods = useLoadFoods()

  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <OneTimeCheckStoreProvider>
          <FoodsStoreProvider initialFoods={foods}>
            <MainLayout>
              <DietEditor />
            </MainLayout>
          </FoodsStoreProvider>
        </OneTimeCheckStoreProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App
