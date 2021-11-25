import {
  Flex,
  FormControl,
  FormLabel,
  Link,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Food, FoodForm } from 'foods'
import { useFormContext } from 'react-hook-form'

type Props = {
  canEdit: boolean
  food?: Food
}

function UrlField({ canEdit, food }: Props) {
  const { register } = useFormContext<FoodForm>()

  return (
    <Flex minHeight={canEdit ? '200px' : undefined} flexDirection="column">
      {canEdit && (
        <Alert status="info" mb={3}>
          <AlertIcon color="teal.400" />
          Add a link will open a web page when the food is clicked. This is
          useful if you want to show a specific product.
        </Alert>
      )}

      <FormControl id="email">
        <Flex alignItems="center">
          <FormLabel mb={0} flexShrink={0}>
            Link:
          </FormLabel>
          {canEdit ? (
            <Input
              {...register('url')}
              placeholder="http://example.com"
              type="email"
            />
          ) : (
            <Link
              href={food?.url}
              target="_blank"
              noOfLines={1}
              color="teal.500"
            >
              {food?.url}
            </Link>
          )}
        </Flex>
      </FormControl>
    </Flex>
  )
}

export default UrlField
