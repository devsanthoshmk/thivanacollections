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
    if (!authStore.isAuthenticated.value) {
      localStorage.removeItem('cart')
      cartStore.clearCart()
      return
    }
    
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


  const loadOrders = async () => {
    loading.value = true
    error.value = null  
    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', authStore.user.value.id)   // optional extra safeguard
        .order('created_at', { ascending: false });

        if (fetchError) throw fetchError
        
        orders.value = data
        console.log("Fetched orders:", data)
    } catch (err) {
      error.value = err.message
      console.error('Error loading orders:', err)
    } finally {
      loading.value = false
    }

  }

  return {
    orders,
    loading,
    error,
    loadOrders,
    // createOrder,
    getOrderById,
    // updateOrderStatus,
    // initOrders
  }
}