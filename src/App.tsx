import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DragDropRespondersProvider } from 'core/dndResponders'
import { DietStatsProvider } from 'core/dietStats'
import Sidebar from 'components/Sidebar'

function App() {
  return (
    <ChakraProvider>
      <DragDropRespondersProvider>
        <DietStatsProvider>
          <MainLayout sidebarElement={<Sidebar />}>
            <DietEditor />
          </MainLayout>
        </DietStatsProvider>
      </DragDropRespondersProvider>
    </ChakraProvider>
  )
}

export default App
