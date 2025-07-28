import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  VStack,
  HStack,
  Badge,
  useColorModeValue
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { 
  FiShoppingCart, 
  FiUsers, 
  FiBarChart2, 
  FiPackage, 
  FiTrendingUp, 
  FiShield 
} from "react-icons/fi"

export default function HomePage() {
  const navigate = useNavigate()
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, indigo.100)", 
    "linear(to-br, gray.900, blue.900)"
  )

  const features = [
    {
      icon: FiShoppingCart,
      title: "Order Processing",
      description: "Streamlined order intake and processing",
      color: "blue.500"
    },
    {
      icon: FiPackage,
      title: "Inventory Management",
      description: "Real-time stock tracking",
      color: "green.500"
    },
    {
      icon: FiUsers,
      title: "Customer Portal",
      description: "Self-service order tracking",
      color: "purple.500"
    },
    {
      icon: FiBarChart2,
      title: "Admin Dashboard",
      description: "Comprehensive reporting",
      color: "orange.500"
    },
    {
      icon: FiTrendingUp,
      title: "Analytics",
      description: "Detailed insights",
      color: "teal.500"
    },
    {
      icon: FiShield,
      title: "Security",
      description: "Enterprise-grade protection",
      color: "red.500"
    }
  ]

  return (
    <Box bg={bgGradient} minH="calc(100vh - 64px)">
      <Container maxW="7xl" py={20}>
        <VStack spacing={20}>
        
          <VStack spacing={6} textAlign="center" maxW="4xl">
            <Badge colorScheme="blue" px={4} py={1} borderRadius="full">
              Professional Order Management
            </Badge>
            <Heading size="2xl" color="gray.900">
              Complete Order Management System
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Streamline your business operations with our platform.
            </Text>

            <HStack spacing={4} pt={4}>
              <Button
                size="lg"
                colorScheme="blue"
                onClick={() => navigate("/track-order")}
              >
                Track Your Order
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="blue"
                onClick={() => navigate("/dashboard")}
              >
                Admin Dashboard
              </Button>
            </HStack>
          </VStack>

     
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Card key={index} _hover={{ shadow: "md" }}>
                <CardBody textAlign="center" p={8}>
                  <VStack spacing={4}>
                    <Box p={3} borderRadius="full" bg={`${feature.color.split('.')[0]}.100`}>
                      <Icon as={feature.icon} boxSize={8} color={feature.color} />
                    </Box>
                    <Heading size="md">{feature.title}</Heading>
                    <Text color="gray.600">{feature.description}</Text>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}