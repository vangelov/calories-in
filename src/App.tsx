import { ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import { FoodsStoreProvider } from 'foods'
import { loadFoods } from 'foods/persistence'
import { OneTimeCheckStoreProvider, ScreenSizeProvider } from 'general'
import { DietEditor } from 'diets'
import { useState } from 'react'
import { PortionsStoreProvider } from 'portions'

import 'scroll-polyfill/auto'

function App() {
  const [foods] = useState(loadFoods)

  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <OneTimeCheckStoreProvider>
          <PortionsStoreProvider>
            <FoodsStoreProvider initialFoods={foods}>
              <MainLayout>
                <DietEditor />
              </MainLayout>
            </FoodsStoreProvider>
          </PortionsStoreProvider>
        </OneTimeCheckStoreProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App
