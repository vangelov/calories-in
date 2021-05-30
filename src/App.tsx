import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DragAndDropRespondersProvider } from 'core/dndResponders'
import { FoodsListProvider } from 'core/foods'
import builInFoods from 'core/foods/builtIn.json'
import 'focus-visible/dist/focus-visible'
import theme from 'components/theme'
import { FoodsCategoriesProvider } from 'core/foodsCategories'
import smoothscroll from 'smoothscroll-polyfill'
import OneTimeCheckProvider from 'core/OneTimeCheckProvider'

smoothscroll.polyfill()

function App() {
  return (
    <ChakraProvider theme={theme}>
      <DragAndDropRespondersProvider>
        <FoodsListProvider initialFoods={builInFoods}>
          <FoodsCategoriesProvider>
            <OneTimeCheckProvider>
              <MainLayout>
                <DietEditor />
              </MainLayout>
            </OneTimeCheckProvider>
          </FoodsCategoriesProvider>
        </FoodsListProvider>
      </DragAndDropRespondersProvider>
    </ChakraProvider>
  )
}

export default App
