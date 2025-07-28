import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Progress,
  SimpleGrid,
  Divider,
  Box,
  Icon
} from "@chakra-ui/react";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiCreditCard
} from "react-icons/fi";

const statusConfig = {
  placed: { icon: FiClock, color: "yellow", label: "Order Placed" },
  picked: { icon: FiPackage, color: "blue", label: "Order Picked" },
  shipped: { icon: FiTruck, color: "purple", label: "Shipped" },
  delivered: { icon: FiCheckCircle, color: "green", label: "Delivered" }
};

export default function OrderDetails({ order }) {
  const statusOrder = ["placed", "picked", "shipped", "delivered"];
  const currentStatusIndex = statusOrder.indexOf(order.status);
  const progressValue = ((currentStatusIndex + 1) / statusOrder.length) * 100;

  return (
    <VStack spacing={6} w="full">
      {/* Order Info Card */}
      <Card w="full" shadow="md">
        <CardHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <Heading size="md">Order #{order.orderId}</Heading>
              <Text fontSize="sm" color="gray.600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </VStack>
            <Badge
              colorScheme={statusConfig[order.status].color}
              px={3}
              py={1}
              borderRadius="full"
            >
              <HStack spacing={1}>
                <Icon as={statusConfig[order.status].icon} />
                <Text>{statusConfig[order.status].label}</Text>
              </HStack>
            </Badge>
          </HStack>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {/* Customer Information */}
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="gray.700">
                Customer Information
              </Heading>
              <Box>
                <Text fontWeight="medium">{order.customerName}</Text>
                <Text fontSize="sm" color="gray.600">
                  {order.customerEmail}
                </Text>
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {order.shippingAddress}
                </Text>
              </Box>
            </VStack>

            {/* Order Summary */}
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="gray.700">
                Order Summary
              </Heading>
              <Box>
                <HStack>
                  <Icon as={FiPackage} color="gray.500" />
                  <Text fontSize="sm">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""}
                  </Text>
                </HStack>
                <HStack mt={1}>
                  <Icon as={FiDollarSign} color="gray.500" />
                  <Text fontSize="sm">
                    Total: ${order.totalAmount?.toFixed(2)}
                  </Text>
                </HStack>
                <HStack mt={1}>
                  <Icon as={FiCreditCard} color="gray.500" />
                  <Badge
                    colorScheme={order.paymentCollected ? "green" : "orange"}
                    ml={1}
                  >
                    {order.paymentCollected ? "Paid" : "Pending"}
                  </Badge>
                </HStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Progress Tracker */}
      <Card w="full" shadow="md">
        <CardHeader>
          <Heading size="md">Order Progress</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={6}>
            <Progress
              value={progressValue}
              colorScheme={statusConfig[order.status].color}
              size="lg"
              w="full"
              borderRadius="full"
            />
            <HStack justify="space-between" w="full">
              {statusOrder.map((status) => {
                const config = statusConfig[status];
                const isActive =
                  statusOrder.indexOf(order.status) >=
                  statusOrder.indexOf(status);
                const isCurrent = order.status === status;

                return (
                  <VStack key={status} spacing={2} flex={1}>
                    <Box
                      as={config.icon}
                      boxSize={8}
                      color={isActive ? `${config.color}.500` : "gray.300"}
                      p={2}
                      borderRadius="full"
                      bg={isCurrent ? `${config.color}.100` : "transparent"}
                      border={isCurrent ? "2px solid" : "none"}
                      borderColor={
                        isCurrent ? `${config.color}.500` : "transparent"
                      }
                    />
                    <Text
                      fontSize="xs"
                      fontWeight={isActive ? "bold" : "normal"}
                      color={isActive ? "gray.900" : "gray.400"}
                      textAlign="center"
                    >
                      {config.label}
                    </Text>
                  </VStack>
                );
              })}
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Order Items */}
      <Card w="full" shadow="md">
        <CardHeader>
          <Heading size="md">Order Items</Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} divider={<Divider />}>
            {order.items.map((item, index) => (
              <HStack
                key={index}
                justify="space-between"
                w="full"
                align="start"
              >
                <VStack align="start" spacing={1} flex={1}>
                  <Text fontWeight="medium" fontSize="md">
                    {item.productName}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Quantity: {item.quantity} × ${item.price?.toFixed(2)}
                  </Text>
                </VStack>
                <Text fontWeight="bold" fontSize="lg" color="blue.600">
                  ${(item.price * item.quantity)?.toFixed(2)}
                </Text>
              </HStack>
            ))}
            <HStack
              justify="space-between"
              w="full"
              pt={2}
              borderTop="2px solid"
              borderColor="gray.100"
            >
              <Text fontSize="lg" fontWeight="bold">
                Total Amount:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.600">
                ${order.totalAmount?.toFixed(2)}
              </Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
}
