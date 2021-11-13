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

type Props = {
  nameInputRef: RefObject<HTMLInputElement>
  food?: Food
  isEditing: boolean
  tabIndex: number
  onTabIndexChange: (index: number) => void
}

function Tabs({
  nameInputRef,
  food,
  isEditing,
  tabIndex,
  onTabIndexChange,
}: Props) {
  const showsVolumeTab = isEditing || food?.volume
  const showsLinkTab = isEditing || food?.url
  const { formState } = useFormContext()

  if (formState.errors?.energy) {
  }

  return (
    <TabsBase
      index={tabIndex}
      onChange={onTabIndexChange}
      variant="enclosed"
      colorScheme="teal"
    >
      <TabList>
        <Tab color={formState.errors?.energy ? 'red.500' : undefined}>
          Nutrition Facts
        </Tab>
        {showsVolumeTab && <Tab>Volume</Tab>}
        {showsLinkTab && <Tab>Link</Tab>}
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
        {showsLinkTab && (
          <TabPanel px={0}>
            <UrlField canEdit={isEditing} food={food} />
          </TabPanel>
        )}
      </TabPanels>
    </TabsBase>
  )
}

export default Tabs
