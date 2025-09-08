<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <Toast />
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
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore()
// const ordersStore = useOrdersStore()
const cartStore = useCartStore()

const toast = useToast()

onMounted(async () => {
  // Initialize authentication state
  await authStore.initAuth()
  
  // Initialize cart based on authentication state
  cartStore.initCart(toast)
  
  // Initialize orders if user is authenticated
  if (authStore.isAuthenticated.value) {
    // ordersStore.initOrders()
  }
})

</script>

<style scoped>
</style>