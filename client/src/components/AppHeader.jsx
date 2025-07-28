import { useAuth } from "../../contexts/AuthContext"
import { FiHome, FiShoppingCart, FiBarChart2 } from "react-icons/fi"

export default function AppHeader() {
  const { user, logout } = useAuth()
 
  return (
    <Box bg="white" borderBottom="1px" borderColor="gray.200">
      <Container maxW="7xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
         
        </Flex>
      </Container>
    </Box>
  )
}