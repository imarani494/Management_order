import { useState } from "react"
import { Box, Container } from "@chakra-ui/react"
import OrderSearch from "../../components/orders/OrderSearch"
import OrderDetails from "../../components/orders/OrderDetails"
import { API_BASE_URL } from "../../lib/api/apiClient"

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError("Please enter an order ID")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`)
      if (!response.ok) {
        throw new Error("Order not found. Please check your order ID.")
      }
      const data = await response.json()
      setOrder(data)
    } catch (err) {
      setError(err.message)
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="calc(100vh - 64px)" py={8}>
      <Container maxW="4xl">
        <OrderSearch
          orderId={orderId}
          setOrderId={setOrderId}
          onSearch={handleSearch}
          loading={loading}
          error={error}
        />
        {order && <OrderDetails order={order} />}
      </Container>
    </Box>
  )
}