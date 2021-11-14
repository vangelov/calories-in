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
import { useFormContext } from 'react-hook-form'

type TabName = 'nutrition' | 'volume' | 'link'

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  isEditing: boolean
  selectedTabName: TabName
  tabNames: TabName[]
  onTabNameChange: (name: TabName) => void
}

function Tabs({
  nameInputRef,
  food,
  isEditing,
  selectedTabName,
  tabNames,
  onTabNameChange,
}: Props) {
  const { formState } = useFormContext()
  const tabIndex = tabNames.indexOf(selectedTabName)

  function onTabIndexChange(index: number) {
    onTabNameChange(tabNames[index])
  }

  return (
    <TabsBase
      variant="enclosed"
      colorScheme="teal"
      index={tabIndex}
      onChange={onTabIndexChange}
    >
      <TabList>
        <Tab color={formState.errors?.energy ? 'red.500' : undefined}>
          Nutrition Facts
        </Tab>

        {tabNames.includes('volume') && <Tab>Volume</Tab>}
        {tabNames.includes('link') && <Tab>Link</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <NutritionFactsFormFields
            nameInputRef={nameInputRef}
            canEdit={isEditing}
          />
        </TabPanel>
        {tabNames.includes('volume') && (
          <TabPanel px={0}>
            <VolumeFormFields food={food} canEdit={isEditing} />
          </TabPanel>
        )}

        {tabNames.includes('link') && (
          <TabPanel px={0}>
            <UrlField canEdit={isEditing} food={food} />
          </TabPanel>
        )}
      </TabPanels>
    </TabsBase>
  )
}

export type { TabName }

export default Tabs
