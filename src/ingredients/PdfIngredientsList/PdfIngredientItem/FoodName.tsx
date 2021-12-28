import { Text, StyleSheet, View, Link } from '@react-pdf/renderer'
import { Food, FoodId } from 'foods'
import { IngredientForm } from 'ingredients'
import { Portion } from 'portions'
import getComputedColorFromChakra from 'theme/getComputedColorFromChakra'
import getIngredientPortionDescription from 'portions/getIngredientPortionDescription'
type Props = {
  ingredientForm: IngredientForm
  foodsById: Record<FoodId, Food>
  portionsById: Record<string, Portion>
}

function Name({ ingredientForm, foodsById, portionsById }: Props) {
  const { foodId } = ingredientForm
  const food = foodsById[foodId]

  const text = (
    <>
      <Text style={{ fontWeight: 'medium' }}>
        {getIngredientPortionDescription(
          ingredientForm,
          foodsById,
          portionsById
        )}
      </Text>{' '}
      {food.name}
    </>
  )

  return (
    <View style={styles.root}>
      {food.url ? (
        <Link
          src={food.url}
          style={[
            styles.nameLink,
            {
              color: getComputedColorFromChakra('teal.500'),
            },
          ]}
        >
          {text}
        </Link>
      ) : (
        <Text
          style={[
            styles.nameText,
            { color: getComputedColorFromChakra('gray.600') },
          ]}
        >
          {text}
        </Text>
      )}

      {ingredientForm.notes && (
        <Text
          style={[
            styles.notes,
            { color: getComputedColorFromChakra('gray.500') },
          ]}
        >
          {ingredientForm.notes}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { marginLeft: 12 },
  nameText: {
    fontSize: 14,
  },
  nameLink: {
    fontSize: 14,
    textDecoration: 'none',
  },
  notes: {
    marginTop: 3,
    fontSize: 12,
  },
})

export default Name
