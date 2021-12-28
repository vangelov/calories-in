import { Text, StyleSheet, View } from '@react-pdf/renderer'
import getComputedColorFromChakra from 'theme/getComputedColorFromChakra'

type Props = {
  notes: string
}

function Notes({ notes }: Props) {
  return (
    <View
      style={[
        styles.root,
        {
          borderTopColor: getComputedColorFromChakra('gray.100'),
        },
      ]}
    >
      <Text
        style={[
          {
            color: getComputedColorFromChakra('gray.600'),
          },
          styles.text,
        ]}
      >
        {notes}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderTopWidth: 1,
    fontSize: 14,
  },
  text: {
    flexDirection: 'row',
    flex: 1,
  },
})

export default Notes
