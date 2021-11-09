import { Food } from 'foods'
import NutritionFactsFormFields from './NutritionFactsFormFields'
import { RefObject } from 'react'
import {
  Tabs as TabsBase,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import VolumeFormFields from './VolumeFormFields'
import UrlField from './UrlField'

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  isEditing: boolean
}

function Tabs({ nameInputRef, food, isEditing }: Props) {
  const showsVolumeTab = isEditing || food?.volume

  return (
    <TabsBase variant="enclosed" colorScheme="teal">
      <TabList>
        <Tab>Nutrition Facts</Tab>
        {showsVolumeTab && <Tab>Volume</Tab>}
        <Tab>Link</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <NutritionFactsFormFields
            nameInputRef={nameInputRef}
            canEdit={isEditing}
          />
        </TabPanel>
        {showsVolumeTab && (
          <TabPanel px={0}>
            <VolumeFormFields food={food} canEdit={isEditing} />
          </TabPanel>
        )}
        <TabPanel px={0}>
          <UrlField canEdit={isEditing} food={food} />
        </TabPanel>
      </TabPanels>
    </TabsBase>
  )
}

export default Tabs
