import { Flex, Button, IconButton, ButtonGroup, chakra } from '@chakra-ui/react'
//import { DietForm } from 'core/dietForm'
import { useUndoRedoMethods, useUndoRedoState } from 'core/undoRedo'
//import { useFormContext } from 'react-hook-form'
// import { v4 as uuidv4 } from 'uuid'
import { Menu, MenuItem } from 'components/general'
import {
  CornerUpLeft,
  CornerUpRight,
  Copy,
  FileText,
  Trash,
  MoreHorizontal,
  Plus,
  Save,
} from 'react-feather'
import { Tooltip } from '@chakra-ui/react'

const CornerUpLeftStyled = chakra(CornerUpLeft)
const CornerUpRightStyled = chakra(CornerUpRight)
const CopyStyled = chakra(Copy)
const FileTextStyled = chakra(FileText)
const TrashStyled = chakra(Trash)
const PlusStyled = chakra(Plus)
const SaveStyled = chakra(Save)
const MoreHorizontalStyled = chakra(MoreHorizontal)

type Props = {
  onMealAdd: () => void
  onSave: () => void
}

function Controls({ onMealAdd, onSave }: Props) {
  const { undo, redo } = useUndoRedoMethods()
  const { canUndo, canRedo } = useUndoRedoState()

  function onUndo() {
    undo()
  }

  function onRedo() {
    redo()
  }

  /*
    const { getValues, reset } = useFormContext<DietForm>()

  function onRearrange() {
    const form = getValues()
    const { mealsForms } = form

    const newMealsForms = []

    for (let i = mealsForms.length - 1; i >= 0; i--) {
      const mealForm = { ...mealsForms[i], fieldId: uuidv4() }
      newMealsForms.push(mealForm)
    }

    const newForm = {
      ...form,
      mealsForms: newMealsForms,
    }

    reset(newForm)
  }*/

  return (
    <Flex width="100%" pt={3} alignItems="center">
      <Flex flex="4" justifyContent="space-between">
        <ButtonGroup spacing={1} variant="outline">
          <Tooltip hasArrow label="Undo" aria-label="A tooltip">
            <IconButton
              aria-label="undo"
              icon={
                <CornerUpLeftStyled color="gray.400" pointerEvents="none" />
              }
              isDisabled={!canUndo}
              onClick={onUndo}
            />
          </Tooltip>

          <Tooltip hasArrow label="Redo" aria-label="A tooltip">
            <IconButton
              aria-label="test"
              icon={
                <CornerUpRightStyled color="gray.400" pointerEvents="none" />
              }
              isDisabled={!canRedo}
              onClick={onRedo}
            />
          </Tooltip>
        </ButtonGroup>

        <ButtonGroup spacing={1} variant="outline">
          <Tooltip hasArrow label="Duplicate" aria-label="A tooltip">
            <IconButton
              aria-label="undo"
              icon={<CopyStyled color="gray.400" pointerEvents="none" />}
            />
          </Tooltip>

          <Tooltip hasArrow label="Export" aria-label="A tooltip">
            <IconButton
              aria-label="test"
              icon={<FileTextStyled color="gray.400" pointerEvents="none" />}
            />
          </Tooltip>

          <Tooltip hasArrow label="Delete" aria-label="A tooltip">
            <IconButton
              aria-label="test"
              icon={<TrashStyled color="gray.400" pointerEvents="none" />}
            />
          </Tooltip>
        </ButtonGroup>
      </Flex>

      <Flex flex="6" justifyContent="flex-end">
        <Button
          leftIcon={<SaveStyled color="gray.400" pointerEvents="none" />}
          variant="outline"
          mr={1}
          onClick={onSave}
        >
          Save
        </Button>
        <Button
          leftIcon={<PlusStyled color="white" pointerEvents="none" />}
          mr={1}
          variant="solid"
          onClick={onMealAdd}
        >
          Add Meal
        </Button>

        <Menu
          arrow
          align="end"
          viewScroll="close"
          menuButton={
            <IconButton
              aria-label="test"
              icon={
                <MoreHorizontalStyled color="gray.400" pointerEvents="none" />
              }
              variant="outline"
            />
          }
        >
          <MenuItem>Remove</MenuItem>
          <MenuItem>Cancel</MenuItem>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Controls
