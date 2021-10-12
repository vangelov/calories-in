import { ChakraProvider } from '@chakra-ui/react'
import { MainLayout } from 'layout'
import 'focus-visible/dist/focus-visible'
import theme from 'theme'
import smoothscroll from 'smoothscroll-polyfill'
import { FoodsStoreProvider } from 'foods'
import { loadFoods } from 'foods/persistence'
import { OneTimeCheckStoreProvider } from 'general'
import { DietEditor } from 'diets'
import { useState } from 'react'

smoothscroll.polyfill()

function App() {
  const [foods] = useState(loadFoods)

  return (
    <ChakraProvider theme={theme}>
      <OneTimeCheckStoreProvider>
        <FoodsStoreProvider initialFoods={foods}>
          <MainLayout>
            <DietEditor />
          </MainLayout>
        </FoodsStoreProvider>
      </OneTimeCheckStoreProvider>
    </ChakraProvider>
  )
}

export default App
