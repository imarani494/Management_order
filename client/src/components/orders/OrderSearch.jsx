import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  HStack,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react"
import { FiSearch } from "react-icons/fi"

export default function OrderSearch({ 
  orderId, 
  setOrderId, 
  onSearch, 
  loading, 
  error 
}) {
  return (
    <Card w="full" shadow="md">
      <CardHeader>
        <HStack>
          <FiSearch />
          <Heading size="md">Order Lookup</Heading>
        </HStack>
        <Text fontSize="sm" color="gray.600" mt={2}>
          Enter your order ID to track your shipment
        </Text>
      </CardHeader>
      <CardBody>
        <HStack>
          <Input
            placeholder="Enter Order ID (e.g., ORD-00001)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            size="lg"
          />
          <Button
            onClick={onSearch}
            isLoading={loading}
            loadingText="Searching..."
            colorScheme="blue"
            size="lg"
            minW="120px"
            leftIcon={<FiSearch />}
          >
            Search
          </Button>
        </HStack>
        {error && (
          <Alert status="error" mt={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      </CardBody>
    </Card>
  )
}