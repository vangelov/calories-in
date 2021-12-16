import { useDietForm, useScrollManager } from 'diets'
import { DietFormVersionsStoreProvider } from 'undoRedo'
import { useRef } from 'react'
import { Page, PageHeader, PageBody } from 'layout'
import { MealsList } from 'meals'
import useDietFormEvents from './useDietFormEvents'
import {
  Box,
  useDisclosure,
  Flex,
  HStack,
  Button,
  Divider,
  Link,
} from '@chakra-ui/react'
import { ScreenSize, useElementHeight, useScreenSize } from 'general'
import Controls from './Controls'
import { FoodsDrawer } from 'foods'
import { VariantsList, VariantStats } from 'variants'
import useVariantFormEvents from './useVariantFormActions'
import About from './About'

function Form() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null)
  const dietForm = useDietForm()
  const { variantsForms } = dietForm
  const selectedVariantForm = variantsForms[dietForm.selectedVariantFormIndex]

  const scrollManager = useScrollManager({
    selectedVariantForm,
    horizontalScrollRef,
  })

  const foodsDrawerDisclosure = useDisclosure()
  const dietFormEvents = useDietFormEvents({
    scrollManager,
    foodsDrawerDisclosure,
  })

  const {
    elementHeight: headerHeight,
    elementRef: headerRef,
  } = useElementHeight()
  const variantFormEvents = useVariantFormEvents({ scrollManager })

  const screenSize = useScreenSize()

  const aboutModalDisclosure = useDisclosure()

  return (
    <DietFormVersionsStoreProvider
      horizontalScrollRef={horizontalScrollRef}
      form={dietForm}
      onUndo={dietFormEvents.onUndoOrRedo}
      onRedo={dietFormEvents.onUndoOrRedo}
    >
      <Page>
        <PageHeader ref={headerRef}>
          <Box bg="white" py={3}>
            <Controls />
          </Box>
        </PageHeader>

        <PageBody>
          <VariantsList
            onVariantFormCopy={variantFormEvents.onVariantFormCopy}
            onVariantFormSelect={variantFormEvents.onVariantFormSelect}
            ref={horizontalScrollRef}
          />

          <Flex justifyContent="space-between">
            <MealsList
              flex={1}
              headerHeight={headerHeight}
              selectedVariantFormFieldId={selectedVariantForm.fieldId}
              mealsForms={selectedVariantForm.mealsForms}
              selectedVariantFormIndex={dietForm.selectedVariantFormIndex}
              onAddMeal={foodsDrawerDisclosure.onOpen}
            />

            {screenSize >= ScreenSize.Large && (
              <VariantStats
                position="sticky"
                top={`${headerHeight + 24}px`}
                ml={6}
                width="300px"
                bg="white"
                borderRadius={6}
                boxShadow="base"
              />
            )}
          </Flex>

          <Box mt={10}>
            <Divider />
            <HStack height="50px" justify="center" spacing={3}>
              <Button
                variant="link"
                color="gray.400"
                fontWeight="thin"
                onClick={aboutModalDisclosure.onOpen}
              >
                About
              </Button>

              <Link
                variant="link"
                color="gray.400"
                target="_blank"
                href="https://www.termsfeed.com/live/7e9b9ec6-aca7-4c99-a987-feb8b535a8e9"
              >
                Terms
              </Link>

              <Link
                variant="link"
                color="gray.400"
                target="_blank"
                href="https://www.termsfeed.com/live/ff5061b9-09e0-4fae-a8e9-010274f2085c"
              >
                Disclaimer
              </Link>
            </HStack>
          </Box>

          <FoodsDrawer
            isOpen={foodsDrawerDisclosure.isOpen}
            onClose={foodsDrawerDisclosure.onClose}
            mealName={`Meal ${selectedVariantForm.mealsForms.length + 1}`}
            onSelectedFoods={dietFormEvents.onMealAdded}
          />

          <About
            isOpen={aboutModalDisclosure.isOpen}
            onClose={aboutModalDisclosure.onClose}
          />
        </PageBody>
      </Page>
    </DietFormVersionsStoreProvider>
  )
}

export default Form
