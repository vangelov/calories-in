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

export default App
