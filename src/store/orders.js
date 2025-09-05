import { ref, computed } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from './auth'
import { useCartStore } from './cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

const orders = ref([])
const loading = ref(false)
const error = ref(null)

export const useOrdersStore = () => {

  // Clear cart after successful order
  const clearCartAfterOrder = async () => {
    if (!authStore.isAuthenticated.value) return
    
    try {
      // Delete all cart items for the user
      const { error: deleteError } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', authStore.user.value.id)
      
      if (deleteError) throw deleteError
      
      // Clear local cart
      cartStore.clearCart()
    } catch (err) {
      console.error('Error clearing cart after order:', err)
    }
  }

  // Get order by ID
  const getOrderById = (orderId) => {
    return computed(() => orders.value.find(order => order.id === orderId))
  }

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    loading.value = true
    error.value = null
    
    try {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
      
      if (updateError) throw updateError
      
      // Update local orders
      const order = orders.value.find(order => order.id === orderId)
      if (order) {
        order.status = status
      }
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      console.error('Error updating order status:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // we dont need to load orders on authentication now(dev in progress:going to make checkout)

  // Load orders when user logs in
  // const initOrders = () => {
  //   if (authStore.isAuthenticated.value) {
  //     loadOrders()
  //   }
  // }

  return {
    orders,
    loading,
    error,
    // loadOrders,
    // createOrder,
    getOrderById,
    updateOrderStatus,
    // initOrders
  }
}