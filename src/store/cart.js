import { ref, computed, watch } from 'vue'
import { supabase } from '../supabase'
import { useAuthStore } from './auth'
import { useProductsStore } from './products'
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore()
const cart = ref([])
const loading = ref(false)
const error = ref(null)

const isSyncing = ref(false)
let toast;

export const useCartStore = () => {
  
  // Load cart from localStorage for unauthenticated users
  const loadLocalCart = () => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        cart.value = JSON.parse(savedCart)
      }
    } catch (err) {
      console.error('Error loading local cart:', err)
      cart.value = []
    }
  }

  // Save cart to localStorage for unauthenticated users
  const saveLocalCart = () => {

    try {
      localStorage.setItem('cart', JSON.stringify(cart.value))
      toast.add({severity:'success', summary: 'Cart Updated', detail: 'Your cart has been updated successfully. Please login to sync your cart across devices.', life: 3000});
    } catch (err) {
      console.error('Error saving local cart:', err)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Failed to update cart. Please <a href="/signup" class="text-blue-500 underline">login/signup</a> and try again.`,
        life: 10000,
        escape: false   // 👈 allows HTML rendering
      })

    }
  }

  // Load cart from Supabase when user logs in
  const loadCart = async () => {
    console.log("in load cart", authStore.user.value?.id, authStore.isAuthenticated.value)
    if (!authStore.isAuthenticated.value || !authStore.user.value?.id) return
    
    loading.value = true
    error.value = null
    
    try {
      syncLocalCartToDatabase()
      const { data, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', authStore.user.value.id)
      
      if (fetchError) throw fetchError
      if (error.value) throw new Error(error.value)
      // Transform data to match local cart format
      cart.value = data.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        product_image_index: item.product_image_index,
        id: item.id
      }))
      console.log("cart.value", cart.value)
    } catch (err) {
      error.value = err.message
      console.error('Error loading cart:', err)
    } finally {
      loading.value = false
    }
  }

  // Sync local cart to Supabase when user logs in
  const syncLocalCartToDatabase = async () => {
    if (!authStore.isAuthenticated.value || !authStore.user.value?.id) return

    const localCart = localStorage.getItem('cart')
    if (!localCart) return

    try {
      const cartItems = JSON.parse(localCart)
      if (cartItems.length === 0) {
        
      }

      isSyncing.value = true
      loading.value = true
      error.value = null

      const { data: existingItems, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', authStore.user.value.id)
      if (fetchError) throw fetchError

      // Key by product_id and product_image_index for uniqueness
      const cartMap = existingItems.reduce((acc, item) => {
        acc[`${item.product_id}_${item.product_image_index}`] = item
        return acc
      }, {})

      for (const item of cartItems) {
        const key = `${item.product_id}_${item.product_image_index}`
        if (cartMap[key]) {
          console.log("condition",cartMap[key].id === item.id, cartMap[key].id, item.id)
          if (cartMap[key].id === item.id) {
              

            // Update quantity if item exists
            const existingItem = cartMap[key]
            const newQuantity = existingItem.quantity + item.quantity

            const { error: updateError } = await supabase
              .from('cart')
              .update({ quantity: newQuantity })
              .eq('id', existingItem.id)

            if (updateError) throw updateError
          }
        } else {
          // Insert new item if it doesn't exist
          const { error: insertError } = await supabase
            .from('cart')
            .insert({
              user_id: authStore.user.value.id,
              product_id: item.product_id,
              product_image_index: item.product_image_index,
              quantity: item.quantity
            })

          if (insertError) throw insertError
        }
      }

      // Clear local cart after successful sync
      localStorage.removeItem('cart')

      // Reload cart from database
      await loadCart()

    } catch (err) {
      error.value = err.message
      console.error('Error syncing local cart to database:', err)
    } finally {
      loading.value = false
      isSyncing.value = false
    }
  }

  // Add item to cart
  const addToCart = async (product) => {
    console.log('Adding to cart:', product)
    if (!authStore.isAuthenticated.value) {
      // For non-authenticated users, use local cart
      const item = cart.value.find(item => item.product_id === product.product_id && item.product_image_index === product.product_image_index)
      if (item) {
        item.quantity += product.quantity
      } else {
        cart.value.push({ ...product, quantity: 1 })
      }
      saveLocalCart()
      return
    }

    loading.value = true
    error.value = null
    
    try {
      // Check if item already exists in cart
      const { data: existingItems, error: fetchError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', authStore.user.value.id)
        .eq('product_id', product.product_id)

      if (fetchError) {
        console.log('fetchError', fetchError,"at 179 text: // Check if item already exists in cart")
        throw fetchError
      }
      if (existingItems && existingItems.length > 0) {
        // Update quantity if item exists
        const existingItem = existingItems[0]
        const newQuantity = existingItem.quantity + 1
        
        const { error: updateError } = await supabase
          .from('cart')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.id)

        if (updateError) {
          console.log('updateError', updateError, "at 194 text: // Update quantity if item exists")
          console.log('existingItem', existingItem,"cart", cart.value)
          throw updateError
        }

        // Update local cart
        const localItem = cart.value.find(item => item.product_id === product.product_id && item.product_image_index === product.product_image_index)
        if (localItem) {
          localItem.quantity = newQuantity
        }
      } else {
        // Insert new item if it doesn't exist
        const { data, error: insertError } = await supabase
          .from('cart')
          .insert({
            user_id: authStore.user.value.id,
            product_id: product.product_id,
            product_image_index: product.product_image_index,
            quantity: 1
          })
          .select()
        
        if (insertError) throw insertError
        
        // Add to local cart
        cart.value.push({
          product_id: product.product_id,
          product_image_index: product.product_image_index,
          quantity: 1,
          id: data[0].id
        })
      }
      toast.add({severity:'success', summary: 'Added to Cart', detail: 'Product added to cart successfully.', life: 3000});
    } catch (err) {
      error.value = err.message
      console.error('Error adding to cart:', err)
    } finally {
      loading.value = false
    }
  }

  // Remove item from cart
  const removeFromCart = async (productId, productImageIndex) => {
    if (!authStore.isAuthenticated.value) {
      // For non-authenticated users, use local cart
      cart.value = cart.value.filter(item => item.product_id !== productId || item.product_image_index !== productImageIndex)
      saveLocalCart()
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const cartItem = cart.value.find(item => item.product_id === productId && item.product_image_index === productImageIndex)
      if (!cartItem) return
      
      const { error: deleteError } = await supabase
        .from('cart')
        .delete()
        .eq('id', cartItem.id)
      
      if (deleteError) throw deleteError
      
      // Remove from local cart
      cart.value = cart.value.filter(item => item.product_id !== productId || item.product_image_index !== productImageIndex)
    } catch (err) {
      error.value = err.message
      console.error('Error removing from cart:', err)
    } finally {
      loading.value = false
    }
  }

  // Update quantity in cart
  const updateQuantity = async (productId, productImageIndex, quantity) => {
    if (!authStore.isAuthenticated.value) {
      // For non-authenticated users, use local cart
      const item = cart.value.find(item => item.product_id === productId && item.product_image_index === productImageIndex)
      if (item) {
        item.quantity = quantity
      }
      saveLocalCart()
      return
    }

    if (quantity < 1) return
    
    loading.value = true
    error.value = null
    
    try {
      const cartItem = cart.value.find(item => item.product_id === productId && item.product_image_index === productImageIndex)
      if (!cartItem) return
      
      const { error: updateError } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', cartItem.id)
      
      if (updateError) throw updateError
      
      // Update local cart
      const localItem = cart.value.find(item => item.product_id === productId && item.product_image_index === productImageIndex)
      if (localItem) {
        localItem.quantity = quantity
      }
    } catch (err) {
      error.value = err.message
      console.error('Error updating cart quantity:', err)
    } finally {
      loading.value = false
    }
  }

  // Clear cart
  const clearCart = () => {
    cart.value = []
    if (!authStore.isAuthenticated.value) {
      localStorage.removeItem('cart')
    }
  }

  // Save cart to localStorage when user logs out
  const saveCartForLogout = async () => {
    
    try {
      console.log('Saving cart for logout:', cart.value)
      localStorage.setItem('cart', JSON.stringify(cart.value))
    } catch (err) {
      console.error('Error saving cart for logout:', err)
    }
  }

  // Watch for authentication changes
  watch(() => authStore.isAuthenticated.value, async (isAuthenticated, wasAuthenticated) => {
    if (!isAuthenticated && wasAuthenticated === true) {
      // User just logged out - save cart to localStorage
      await saveCartForLogout()
      // cart.value = []
    }
  }, { immediate: true })

  // Initialize cart based on authentication state
  const initCart = (tost) => {
    toast = tost;
    if (authStore.isAuthenticated.value) {
      loadCart()
    } else {
      loadLocalCart()
    }
  }

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    const { products } = useProductsStore()
    return cart.value.reduce((total, item) => total + (products.value[item.product_id]?.price || 0) * item.quantity, 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
    loading,
    error,
    isSyncing,
    loadCart,
    loadLocalCart,
    clearCart,
    initCart,
    saveCartForLogout  // impl later: save cart to localStorage on logout in auth store
  }
}
