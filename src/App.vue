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
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './store/auth'
// import { useOrdersStore } from './store/orders'
import { useCartStore } from './store/cart'

const authStore = useAuthStore()
// const ordersStore = useOrdersStore()
const cartStore = useCartStore()

onMounted(async () => {
  // Initialize authentication state
  await authStore.initAuth()
  
  // Initialize cart based on authentication state
  cartStore.initCart()
  
  // Initialize orders if user is authenticated
  if (authStore.isAuthenticated.value) {
    // ordersStore.initOrders()
  }
})

</script>

<style scoped>
</style>