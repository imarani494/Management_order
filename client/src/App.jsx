import { Routes, Route } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import AppHeader from "./components/layout/AppHeader"
import AppFooter from "./components/layout/AppFooter"
import HomePage from "./features/home/HomePage"
import OrderTrackingPage from "./features/orders/OrderTrackingPage"
import DashboardPage from "./features/dashboard/DashboardPage"
import LoginPage from "./features/auth/LoginPage"
import { AuthProvider } from "./contexts/AuthContext"

export default function App() {
  return (
    <AuthProvider>
      <Box minH="100vh" display="flex" flexDirection="column">
        <AppHeader />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/track-order" element={<OrderTrackingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Box>
        <AppFooter />
      </Box>
    </AuthProvider>
  )
}