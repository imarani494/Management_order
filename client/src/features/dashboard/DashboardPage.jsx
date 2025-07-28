import { useState } from "react"
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Select,
  SimpleGrid,
  Card,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Button
} from "@chakra-ui/react"
import { FiDownload, FiPlus } from "react-icons/fi"
import DataTable from "../../components/ui/DataTable"
import { useOrderManagement } from "../../lib/hooks/useOrderManagement"

export default function DashboardPage() {
  const {
    orders,
    products,
    stats,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateOrderStatus
  } = useOrderManagement()

  const toast = useToast()

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    { key: 'orderId', header: 'Order ID' },
    { key: 'customerName', header: 'Customer' },
    { key: 'status', header: 'Status' },
    { key: 'totalAmount', header: 'Total' },
    { key: 'payment', header: 'Payment' },
    { key: 'createdAt', header: 'Date' }
  ]

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minH="50vh">
      <Spinner size="xl" />
    </Box>
  )

  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  )

  return (
    <Box minH="calc(100vh - 128px)" py={8}>
      <Container maxW="7xl">
        <VStack spacing={8}>
          <HStack justify="space-between" w="full">
            <Heading size="xl">Admin Dashboard</Heading>
            <Button leftIcon={<FiDownload />} variant="outline">
              Export CSV
            </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            <Card>
              <Stat p={4}>
                <StatLabel>Total Orders</StatLabel>
                <StatNumber>{stats.totalOrders}</StatNumber>
              </Stat>
            </Card>
            
          </SimpleGrid>

          <Card w="full">
            <VStack spacing={4} p={4}>
              <HStack w="full">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  w="40"
                >
                  <option value="all">All Status</option>
                  <option value="placed">Placed</option>
                  <option value="picked">Picked</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </Select>
                <Button leftIcon={<FiPlus />} colorScheme="blue">
                  New Order
                </Button>
              </HStack>

              <DataTable 
                data={filteredOrders.map(order => ({
                  ...order,
                  payment: order.paymentCollected ? 'Collected' : 'Pending',
                  createdAt: new Date(order.createdAt).toLocaleDateString()
                }))}
                columns={columns}
                onStatusChange={updateOrderStatus}
              />
            </VStack>
          </Card>
        </VStack>
      </Container>
    </Box>
  )
}