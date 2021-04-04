import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from 'components/layout/MainLayout'
import DietEditor from 'components/DietEditor'
import { DragAndDropRespondersProvider } from 'core/dndResponders'
import { DietStatsProvider } from 'core/stats'
import Sidebar from 'components/Sidebar'

function App() {
  return (
    <ChakraProvider>
      <DragAndDropRespondersProvider>
        <DietStatsProvider>
          <MainLayout sidebarElement={<Sidebar />}>
            <DietEditor />
          </MainLayout>
        </DietStatsProvider>
      </DragAndDropRespondersProvider>
    </ChakraProvider>
  )
}

export default App
