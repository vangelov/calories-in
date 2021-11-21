import { Text, StyleSheet, View } from '@react-pdf/renderer'
import { getComputedColorFromChakra } from 'theme'

type Props = {
  notes: string
}

function Notes({ notes }: Props) {
  const lines = notes.split('\n').filter(line => line.length > 0)

  return (
    <View
      style={[
        styles.root,
        {
          borderTopColor: getComputedColorFromChakra('gray.100'),
        },
      ]}
    >
      {lines.map((line, index) => (
        <View
          style={{
            flexDirection: 'row',
            marginTop: index > 0 ? 12 : 0,
          }}
        >
          <View
            style={[
              {
                backgroundColor: getComputedColorFromChakra('gray.600'),
              },
              styles.dot,
            ]}
          />
          <Text
            style={[
              {
                color: getComputedColorFromChakra('gray.600'),
              },
              styles.line,
            ]}
          >
            {line}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderTopWidth: 1,
    fontSize: 14,
  },
  dot: {
    marginTop: 5,
    width: 7,
    height: 7,
    borderRadius: 4,

    marginRight: 16,
  },
  line: {
    flexDirection: 'row',
    flex: 1,
  },
})

export default Notes
