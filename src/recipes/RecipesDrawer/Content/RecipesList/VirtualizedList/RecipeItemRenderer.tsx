import RecipeItem from './RecipeItem'
import { TOP_PADDING } from './Inner'
import { Recipe } from 'recipes'

type Data = {
  getRecipe: (index: number) => Recipe
  onRecipeSelect: (recipe: Recipe) => void
}

type Props = {
  style: any
  index: number
  data: Data
}

function RecipeItemRenderer({ style, index, data }: Props) {
  const { getRecipe, onRecipeSelect } = data
  const recipe = getRecipe(index)

  return (
    <RecipeItem
      key={recipe.id}
      style={{
        ...style,
        top: `${parseFloat(style['top'] as string) + TOP_PADDING}px`,
      }}
      onChoose={onRecipeSelect}
      recipe={recipe}
    />
  )
}

export default RecipeItemRenderer
