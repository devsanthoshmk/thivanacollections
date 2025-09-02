import { ref, computed } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from './auth'
import { useCartStore } from './cart'

export const useOrdersStore = () => {
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  
  const orders = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Load user orders from Supabase
  const loadOrders = async () => {
      if (!authStore.isAuthenticated.value || !authStore.user.value?.id) return
    
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', authStore.user.value.id)
        .order('created_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      // Load order items for each order
      for (const order of data) {
        const { data: items, error: itemsError } = await supabase
          .from('order_items')
          .select('*')
          .eq('order_id', order.id)
        
        if (itemsError) throw itemsError
        
        order.items = items
      }
      
      orders.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error loading orders:', err)
    } finally {
      loading.value = false
    }
  }

  // Create a new order from cart items
  const createOrder = async (shippingAddress, paymentMethod) => {
    if (!authStore.isAuthenticated.value) {
      error.value = 'You must be logged in to place an order'
      return { success: false, error: error.value }
    }
    
    if (cartStore.cart.value.length === 0) {
      error.value = 'Your cart is empty'
      return { success: false, error: error.value }
    }
    
    loading.value = true
    error.value = null
    
    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: authStore.user.value.id,
          total_amount: cartStore.cartTotal.value, //there no cart total change it
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          status: 'pending'
        })
        .select()
      
      if (orderError) throw orderError
      
      // Create order items
      const orderItems = cartStore.cart.value.map(item => ({
        order_id: order[0].id,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        product_image: item.images[0],
        quantity: item.quantity
      }))
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)
      
      if (itemsError) throw itemsError
      
      // Clear the cart after successful order
      await clearCartAfterOrder()
      
      // Reload orders to include the new one
      await loadOrders()
      
      return { success: true, order: order[0] }
    } catch (err) {
      error.value = err.message
      console.error('Error creating order:', err)
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

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

  // Load orders when user logs in
  const initOrders = () => {
    if (authStore.isAuthenticated.value) {
      loadOrders()
    }
  }

  return {
    orders,
    loading,
    error,
    loadOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    initOrders
  }
}