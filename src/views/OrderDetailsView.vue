<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-accent/10 to-accent/5 py-16">
      <div class="container mx-auto px-6">
        <h1 class="font-serif text-5xl font-bold text-center mb-4" data-aos="fade-up">Order Details</h1>
        <p class="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          View your order information
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
      
      <div v-else-if="!order" class="text-center py-24" data-aos="fade-up">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 mb-6">
          <vue-feather type="alert-circle" class="h-12 w-12 text-accent"></vue-feather>
        </div>
        <h2 class="font-serif text-4xl font-bold mb-4">Order not found</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">The order you're looking for doesn't exist.</p>
        <router-link to="/orders">
          <Button label="View All Orders" class="p-button-lg btn-modern flex items-center justify-center">
            <vue-feather type="arrow-left" class="h-5 w-5 mr-2"></vue-feather>
            <span>View All Orders</span>
          </Button>
        </router-link>
      </div>
      
      <div v-else>
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 card-modern" data-aos="fade-up">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 class="font-serif text-3xl font-bold mb-2">Order #{{ order.order_number }}</h2>
              <p class="text-gray-600 dark:text-gray-400">Placed on {{ formatDate(order.created_at) }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <span :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-semibold">
                {{ formatStatus(order.status) }}
              </span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-serif text-xl font-bold mb-4">Shipping Information</h3>
              <p class="text-gray-600 dark:text-gray-400 whitespace-pre-line">{{ order.shipping_address }}</p>
            </div>
            <div>
              <h3 class="font-serif text-xl font-bold mb-4">Payment Information</h3>
              <p class="text-gray-600 dark:text-gray-400">Method: {{ order.payment_method }}</p>
              <p class="text-gray-600 dark:text-gray-400">Total: ${{ order.total_amount.toFixed(2) }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 card-modern" data-aos="fade-up" data-aos-delay="100">
          <h3 class="font-serif text-xl font-bold mb-4">Order Items</h3>
          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.id" class="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
              <div class="img-hover-zoom rounded-lg overflow-hidden mr-4">
                <img :src="'/' + item.product_image" :alt="item.product_name" class="w-16 h-16 object-cover">
              </div>
              <div class="flex-grow">
                <h4 class="font-bold">{{ item.product_name }}</h4>
                <p class="text-gray-600 dark:text-gray-400">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold">${{ (item.product_price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 card-modern" data-aos="fade-up" data-aos-delay="200">
          <h3 class="font-serif text-xl font-bold mb-4">Order Timeline</h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <vue-feather type="check" class="h-4 w-4 text-green-600"></vue-feather>
              </div>
              <div>
                <p class="font-medium">Order Placed</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ formatDate(order.created_at) }}</p>
              </div>
            </div>
            
            <div class="flex items-start" :class="{ 'opacity-50': order.status === 'pending' }">
              <div class="flex-shrink-0 w-8 h-8 rounded-full" :class="order.status !== 'pending' ? 'bg-green-100' : 'bg-gray-200 dark:bg-gray-700'">
                <vue-feather type="package" class="h-4 w-4 mx-auto" :class="order.status !== 'pending' ? 'text-green-600' : 'text-gray-400'"></vue-feather>
              </div>
              <div>
                <p class="font-medium">Processing</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ order.status !== 'pending' ? 'Completed' : 'Pending' }}</p>
              </div>
            </div>
            
            <div class="flex items-start" :class="{ 'opacity-50': !['shipped', 'delivered'].includes(order.status) }">
              <div class="flex-shrink-0 w-8 h-8 rounded-full" :class="['shipped', 'delivered'].includes(order.status) ? 'bg-green-100' : 'bg-gray-200 dark:bg-gray-700'">
                <vue-feather type="truck" class="h-4 w-4 mx-auto" :class="['shipped', 'delivered'].includes(order.status) ? 'text-green-600' : 'text-gray-400'"></vue-feather>
              </div>
              <div>
                <p class="font-medium">Shipped</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ ['shipped', 'delivered'].includes(order.status) ? 'Completed' : 'Pending' }}</p>
              </div>
            </div>
            
            <div class="flex items-start" :class="{ 'opacity-50': order.status !== 'delivered' }">
              <div class="flex-shrink-0 w-8 h-8 rounded-full" :class="order.status === 'delivered' ? 'bg-green-100' : 'bg-gray-200 dark:bg-gray-700'">
                <vue-feather type="home" class="h-4 w-4 mx-auto" :class="order.status === 'delivered' ? 'text-green-600' : 'text-gray-400'"></vue-feather>
              </div>
              <div>
                <p class="font-medium">Delivered</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">{{ order.status === 'delivered' ? 'Completed' : 'Pending' }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <router-link to="/orders" class="inline-flex items-center text-accent hover:text-accent/80 transition-colors">
            <vue-feather type="arrow-left" class="h-5 w-5 mr-2"></vue-feather>
            Back to Orders
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import VueFeather from 'vue-feather'
import { useOrdersStore } from '../store/orders'

const route = useRoute()
const ordersStore = useOrdersStore()
const { orders, loading, error, loadOrders } = ordersStore

const order = computed(() => {
  return orders.value.find(o => o.id === route.params.id)
})

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