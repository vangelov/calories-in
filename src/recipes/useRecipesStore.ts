import { useState, useMemo } from 'react'
import { makeStoreProvider, useCallbacksMemo } from 'general'
import { Recipe } from 'recipes'

type Params = {
  initialRecipes: Recipe[]
}

function sortedRecipes(recipes: Recipe[]) {
  return [...recipes].sort((recipe1, recipe2) => {
    if (recipe1.categoryId === recipe2.categoryId) {
      return recipe1.name.localeCompare(recipe2.name)
    }

    return recipe1.categoryId - recipe2.categoryId
  })
}

function useRecipesStore({ initialRecipes }: Params) {
  const [recipesById] = useState<Record<number, Recipe>>(() => {
    const initialMap: Record<number, Recipe> = {}

    for (const recipe of initialRecipes) {
      if (recipe.id) {
        initialMap[recipe.id] = recipe
      }
    }

    return initialMap
  })

  const recipes = useMemo(() => sortedRecipes(Object.values(recipesById)), [
    recipesById,
  ])

  const actions = useCallbacksMemo({})

  const state = useCallbacksMemo({
    recipes,
    recipesById,
  })

  return [state, actions] as const
}

const [RecipesStoreProvider, useRecipes] = makeStoreProvider(useRecipesStore)

export { RecipesStoreProvider, useRecipes }

export default useRecipesStore
