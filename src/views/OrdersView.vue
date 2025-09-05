<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-accent/10 to-accent/5 py-16">
      <div class="container mx-auto px-6">
        <h1 class="font-serif text-5xl font-bold text-center mb-4" data-aos="fade-up">My Orders</h1>
        <p class="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Track and manage your orders
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-12">
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {{ error }}
      </div>
      
      <div v-else-if="orders.length === 0" class="text-center py-24" data-aos="fade-up">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 mb-6">
          <vue-feather type="package" class="h-12 w-12 text-accent"></vue-feather>
        </div>
        <h2 class="font-serif text-4xl font-bold mb-4">You haven't placed any orders yet</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">Browse our collection and place your first order!</p>
        <router-link to="/shop">
          <Button label="Start Shopping" class="p-button-lg btn-modern flex items-center justify-center">
            <vue-feather type="arrow-right" class="h-5 w-5 mr-2"></vue-feather>
            <span>Start Shopping</span>
          </Button>
        </router-link>
      </div>
      
      <div v-else>
        <div class="grid grid-cols-1 gap-8">
          <div v-for="order in orders" :key="order.id" 
               class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-modern" 
               data-aos="fade-up">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h3 class="font-serif text-2xl font-bold mb-2">Order #{{ order.order_number }}</h3>
                <p class="text-gray-600 dark:text-gray-400">Placed on {{ formatDate(order.created_at) }}</p>
              </div>
              <div class="mt-4 md:mt-0">
                <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
                  {{ formatStatus(order.status) }}
                </span>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
              <h4 class="font-serif text-xl font-bold mb-4">Order Items</h4>
              <div class="space-y-4">
                <div v-for="item in order.items" :key="item.id" class="flex items-center">
                  <div class="img-hover-zoom rounded-lg overflow-hidden mr-4">
                    <img :src="'/' + products[item.product_id].image[item.product_image_index]" :alt="item.product_name" class="w-16 h-16 object-cover">
                  </div>
                  <div class="flex-grow">
                    <h5 class="font-bold">{{ item.product_name }}</h5>
                    <p class="text-gray-600 dark:text-gray-400">Qty: {{ item.quantity }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold">${{ (item.product_price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h4 class="font-serif text-xl font-bold mb-2">Order Summary</h4>
                  <p class="text-gray-600 dark:text-gray-400">Shipping: {{ order.shipping_address }}</p>
                  <p class="text-gray-600 dark:text-gray-400">Payment: {{ order.payment_method }}</p>
                </div>
                <div class="mt-4 md:mt-0 text-right">
                  <p class="text-2xl font-bold text-accent">Total: ${{ order.total_amount.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import VueFeather from 'vue-feather'
import { useOrdersStore } from '../store/orders'
import { useProductsStore } from '@/store/products'

const productsStore = useProductsStore()
const { products } = productsStore

const ordersStore = useOrdersStore()
const { orders, loading, error, loadOrders } = ordersStore

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'paid':
      return 'bg-green-100 text-slate-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

onMounted(() => {
  loadOrders()
})
</script>