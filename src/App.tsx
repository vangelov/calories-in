import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import builInFoods from 'core/foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'components/theme'
import smoothscroll from 'smoothscroll-polyfill'
import ScreenSizeProvider from 'components/general/ScreenSizeProvider'
import { FoodsStoreProvider } from 'core/foods'
import { OneTimeCheckStoreProvider } from 'general/oneTimeCheck'

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
