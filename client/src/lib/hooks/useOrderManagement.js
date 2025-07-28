import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../api/apiClient'
import { useToast } from '@chakra-ui/react'

export const useOrderManagement = () => {
  const [state, setState] = useState({
    orders: [],
    products: [],
    stats: {},
    loading: true,
    error: '',
    searchTerm: '',
    statusFilter: 'all'
  })

  const toast = useToast()

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      
      const [ordersRes, productsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/orders`),
        fetch(`${API_BASE_URL}/api/products`),
        fetch(`${API_BASE_URL}/api/stats`)
      ])

      if (!ordersRes.ok || !productsRes.ok || !statsRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const [orders, products, stats] = await Promise.all([
        ordersRes.json(),
        productsRes.json(),
        statsRes.json()
      ])

      setState(prev => ({
        ...prev,
        orders,
        products,
        stats,
        loading: false,
        error: ''
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }))
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) throw new Error('Failed to update order')

      toast({
        title: 'Success',
        description: 'Order status updated',
        status: 'success',
        duration: 3000
      })
      await fetchData()
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000
      })
    }
  }

  return {
    ...state,
    fetchData,
    updateOrderStatus,
    setSearchTerm: (term) => setState(prev => ({ ...prev, searchTerm: term })),
    setStatusFilter: (filter) => setState(prev => ({ ...prev, statusFilter: filter }))
  }
}