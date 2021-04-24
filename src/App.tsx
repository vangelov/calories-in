import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DragAndDropRespondersProvider } from 'core/dndResponders'
import { DietStatsProvider } from 'core/stats'
import Sidebar from 'components/Sidebar'
import { FoodsListProvider } from 'core/foods'
import builInFoods from 'core/foods/builtIn.json'
import { extendTheme } from '@chakra-ui/react'
import 'focus-visible/dist/focus-visible'

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      html: {
        overflow: 'hidden',
      },
      '.js-focus-visible :focus:not([data-focus-visible-added])': {
        outline: 'none',
        'box-shadow:': 'none',
      },
    },
  },
})
function App() {
  return (
    <ChakraProvider theme={theme}>
      <DragAndDropRespondersProvider>
        <FoodsListProvider initialFoods={builInFoods}>
          <DietStatsProvider>
            <MainLayout sidebarElement={<Sidebar />}>
              <DietEditor />
            </MainLayout>
          </DietStatsProvider>
        </FoodsListProvider>
      </DragAndDropRespondersProvider>
    </ChakraProvider>
  )
}

export default App
