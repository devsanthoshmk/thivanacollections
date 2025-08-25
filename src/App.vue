<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './store/auth'
import { useOrdersStore } from './store/orders'
import { useCartStore } from './store/cart'

const authStore = useAuthStore()
const ordersStore = useOrdersStore()
const cartStore = useCartStore()

onMounted(async () => {
  // Initialize authentication state
  await authStore.initAuth()
  
  // Initialize cart based on authentication state
  cartStore.initCart()
  
  // Initialize orders if user is authenticated
  if (authStore.isAuthenticated.value) {
    ordersStore.initOrders()
  }
})

// Watch for authentication changes to initialize cart and orders
watch(() => authStore.isAuthenticated.value, (isAuthenticated) => {
  if (isAuthenticated) {
    cartStore.initCart()
    ordersStore.initOrders()
  }
})
</script>

<style scoped>
</style>