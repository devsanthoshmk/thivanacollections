import { ref, computed } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from './auth'
import { useCartStore } from './cart'

const authStore = useAuthStore()
const cartStore = useCartStore()

const orders = ref([])
const loading = ref(false)
const error = ref(null)
const order_id=ref('')

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

  // order_id updated from backed
let userPrevData={}

  const loadOrders = async () => {
    if (!authStore.isAuthenticated.value) return
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
      userPrevData = getUserPrevData()
      console.log("userprevdata",userPrevData)
    } catch (err) {
      error.value = err.message
      console.error('Error loading orders:', err)
    } finally {
      loading.value = false
    }

  }

  const getUserPrevData = () => {
    const data = {}
    for (const item of orders.value) {
      if (item.name!==null && item.name!==undefined) {
        if (data.name !== undefined) {
          data.name = [item.name]
        } else  data.name.push(item.name)
      } else if (item.phone!==null && item.phone!==undefined) {
        if (data.phone !== undefined) {
          data.phone = [item.phone]
        } else  data.phone.push(item.phone)
      } else if (item.address !== null && item.address !== undefined) {
        if (data.address !== undefined) {
          data.address = [item.address.match(/(.*?)\$\$/)]
          data.city = [item.address.match(/\$\$(.*)/)]
        } else {
          data.address.push(item.address.match(/(.*?)\$\$/))
          data.city.push(item.address.match(/\$\$(.*)/))
        }
      } else if (item.postal_code !== null && item.postal_code !== undefined) {
        if (data.postal_code !== undefined) {
          data.postal_code = [item.postal_code]
        } else  data.postal_code.push(item.postal_code)
      }
    }
    return data
  }

  return {
    order_id,
    orders,
    loading,
    error,
    loadOrders,
    // createOrder,
    // getOrderById,
    // updateOrderStatus,
    // initOrders,
    userPrevData
  }
}