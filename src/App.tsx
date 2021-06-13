import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DragAndDropRespondersProvider } from 'core/dndResponders'
import builInFoods from 'core/foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'components/theme'
import smoothscroll from 'smoothscroll-polyfill'
import OneTimeCheckProvider from 'core/OneTimeCheckProvider'
import ScreenSizeProvider from 'core/ScreenSizeProvider'
import { FoodsByIdProvider } from 'core/foods'

smoothscroll.polyfill()

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ScreenSizeProvider>
        <DragAndDropRespondersProvider>
          <FoodsByIdProvider initialFoods={builInFoods}>
            <OneTimeCheckProvider>
              <MainLayout>
                <DietEditor />
              </MainLayout>
            </OneTimeCheckProvider>
          </FoodsByIdProvider>
        </DragAndDropRespondersProvider>
      </ScreenSizeProvider>
    </ChakraProvider>
  )
}

export default App
