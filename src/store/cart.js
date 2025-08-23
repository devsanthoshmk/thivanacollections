// import { ref, computed } from 'vue'

// export const useCartStore = () => {
//   const cart = ref([])

//   const addToCart = (product) => {
//     const item = cart.value.find(item => item.id === product.id)
//     if (item) {
//       item.quantity++
//     } else {
//       cart.value.push({ ...product, quantity: 1 })
//     }
//   }

//   const removeFromCart = (productId) => {
//     cart.value = cart.value.filter(item => item.id !== productId)
//   }

//   const updateQuantity = (productId, quantity) => {
//     const item = cart.value.find(item => item.id === productId)
//     if (item) {
//       item.quantity = quantity
//     }
//   }

//   const cartCount = computed(() => {
//     return cart.value.reduce((total, item) => total + item.quantity, 0)
//   })

//   const cartTotal = computed(() => {
//     return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
//   })

//   return { cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }
// }


import { ref, computed } from 'vue'

const cart = ref([])

export const useCartStore = () => {

  const logCart = (action) => {
    console.log(`🛒 [Cart Action]: ${action}`)
    console.table(cart.value.map(item => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity
    })))
    console.log(`📦 Total Items: ${cartCount.value}, 💰 Total Price: ₹${cartTotal.value}`)
    console.log("--------------------------------------------------")
  }

  const addToCart = (product) => {
    const item = cart.value.find(item => item.id === product.id)
    if (item) {
      item.quantity++
      logCart(`Increased quantity of "${product.name}" (ID: ${product.id}) to ${item.quantity}`)
    } else {
      cart.value.push({ ...product, quantity: 1 })
      logCart(`Added "${product.name}" (ID: ${product.id}) to cart`)
    }
  }

  const removeFromCart = (productId) => {
    const removedItem = cart.value.find(item => item.id === productId)
    if (removedItem) {
      cart.value = cart.value.filter(item => item.id !== productId)
      logCart(`Removed "${removedItem.name}" (ID: ${productId}) from cart`)
    } else {
      console.warn(`⚠️ Tried to remove product with ID: ${productId}, but it was not found in the cart.`)
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      const oldQuantity = item.quantity
      item.quantity = quantity
      logCart(`Updated "${item.name}" (ID: ${productId}) quantity from ${oldQuantity} ➝ ${quantity}`)
    } else {
      console.warn(`⚠️ Tried to update product with ID: ${productId}, but it was not found in the cart.`)
    }
  }

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  return { cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }
}
