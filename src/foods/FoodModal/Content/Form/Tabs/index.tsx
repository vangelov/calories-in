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
}

function Tabs({ nameInputRef, food, isEditing }: Props) {
  const showsVolumeTab = isEditing || food?.volume
  const showsLinkTab = isEditing || food?.url
  const { formState } = useFormContext()

  return (
    <TabsBase variant="enclosed" colorScheme="teal">
      <TabList>
        <Tab color={formState.errors?.energy ? 'red.500' : undefined}>
          Nutrition Facts
        </Tab>

        <Tab display={!showsVolumeTab ? 'none' : undefined}>Volume</Tab>
        <Tab display={!showsLinkTab ? 'none' : undefined}>Link</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <NutritionFactsFormFields
            nameInputRef={nameInputRef}
            canEdit={isEditing}
          />
        </TabPanel>
        <TabPanel px={0}>
          <VolumeFormFields food={food} canEdit={isEditing} />
        </TabPanel>

        <TabPanel px={0}>
          <UrlField canEdit={isEditing} food={food} />
        </TabPanel>
      </TabPanels>
    </TabsBase>
  )
}

export default Tabs
