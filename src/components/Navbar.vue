<template>
  <nav class="bg-primary/90 dark:bg-secondary/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 font-sans border-b border-gray-200 dark:border-gray-700">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <router-link to="/" class="flex items-center">
        <img src="../assets/logo.jpg" alt="Thivana Collections Logo" class="h-12 mr-3">
        <span class="font-serif text-xl font-bold text-secondary dark:text-primary hidden sm:block">Thivana Collections</span>
      </router-link>
      
      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/" class="text-secondary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-300 font-medium relative group">
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link to="/shop" class="text-secondary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-300 font-medium relative group">
          Shop
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link to="/about" class="text-secondary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-300 font-medium relative group">
          About
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link to="/contact" class="text-secondary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-300 font-medium relative group">
          Contact
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        
        <div class="flex items-center space-x-4 ml-4">
          <router-link to="/cart" class="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
            <vue-feather type="shopping-cart" class="h-6 w-6 text-secondary dark:text-primary"></vue-feather>
            <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse">{{ cartCount }}</span>
          </router-link>
          
          <!-- Authentication UI -->
          <div v-if="!authStore.isAuthenticated.value || !authStore.user.value?.id" class="flex items-center space-x-2">
            <router-link to="/login" class="text-secondary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-300 font-medium">
              Login
            </router-link>
            <router-link to="/signup" class="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-300 font-medium">
              Sign Up
            </router-link>
          </div>
          
          <div v-else class="relative">
            <button @click="toggleProfileMenu" class="flex items-center space-x-2 focus:outline-none">
              <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                {{ userInitial }}
              </div>
            </button>
            
            <!-- Profile Dropdown -->
            <div v-if="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
              <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ authStore.user?.email }}</p>
              </div>
              <router-link to="/orders" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                My Orders
              </router-link>
              <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Logout
              </button>
            </div>
          </div>
          
          <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
            <vue-feather :type="isDark ? 'sun' : 'moon'" class="h-6 w-6 text-secondary dark:text-primary"></vue-feather>
          </button>
        </div>
      </div>
      
      <div class="md:hidden flex items-center">
        <router-link to="/cart" class="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-2">
          <vue-feather type="shopping-cart" class="h-6 w-6 text-secondary dark:text-primary"></vue-feather>
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center animate-pulse">{{ cartCount }}</span>
        </router-link>
        
        <button @click="toggleDarkMode" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-2">
          <vue-feather :type="isDark ? 'sun' : 'moon'" class="h-6 w-6 text-secondary dark:text-primary"></vue-feather>
        </button>
        
        <button @click="isOpen = !isOpen" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
          <vue-feather :type="isOpen ? 'x' : 'menu'" class="h-6 w-6 text-secondary dark:text-primary"></vue-feather>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div v-if="isOpen" class="md:hidden bg-primary dark:bg-secondary border-t border-gray-200 dark:border-gray-700">
        <div class="px-6 py-4 space-y-3">
          <router-link to="/" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium">
            <div class="flex items-center">
              <vue-feather type="home" class="h-5 w-5 mr-3"></vue-feather>
              Home
            </div>
          </router-link>
          <router-link to="/shop" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium">
            <div class="flex items-center">
              <vue-feather type="shopping-bag" class="h-5 w-5 mr-3"></vue-feather>
              Shop
            </div>
          </router-link>
          <router-link to="/about" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium">
            <div class="flex items-center">
              <vue-feather type="info" class="h-5 w-5 mr-3"></vue-feather>
              About
            </div>
          </router-link>
          <router-link to="/contact" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium">
            <div class="flex items-center">
              <vue-feather type="mail" class="h-5 w-5 mr-3"></vue-feather>
              Contact
            </div>
          </router-link>
          <router-link to="/cart" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium">
            <div class="flex items-center">
              <vue-feather type="shopping-cart" class="h-5 w-5 mr-3"></vue-feather>
              Cart
              <span v-if="cartCount > 0" class="ml-2 bg-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
            </div>
          </router-link>
          
          <!-- Authentication UI for Mobile -->
          <div v-if="!authStore.isAuthenticated.value || !authStore.user.value?.id" class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <router-link to="/login" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium mb-2">
              <div class="flex items-center">
                <vue-feather type="log-in" class="h-5 w-5 mr-3"></vue-feather>
                Login
              </div>
            </router-link>
            <router-link to="/signup" @click="isOpen = false" class="block px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-300 font-medium">
              <div class="flex items-center justify-center">
                <vue-feather type="user-plus" class="h-5 w-5 mr-3"></vue-feather>
                Sign Up
              </div>
            </router-link>
          </div>
          
          <div v-else class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center px-4 py-3 mb-2">
              <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold mr-3">
                {{ userInitial }}
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ authStore.user?.email }}</p>
              </div>
            </div>
            <router-link to="/orders" @click="isOpen = false" class="block px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium mb-2">
              <div class="flex items-center">
                <vue-feather type="package" class="h-5 w-5 mr-3"></vue-feather>
                My Orders
              </div>
            </router-link>
            <button @click="handleLogout" class="block w-full text-left px-4 py-3 text-secondary dark:text-primary hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium">
              <div class="flex items-center">
                <vue-feather type="log-out" class="h-5 w-5 mr-3"></vue-feather>
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import VueFeather from 'vue-feather';
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const { cartCount } = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const isOpen = ref(false)
const isDark = ref(false)
const showProfileMenu = ref(false)

const userInitial = computed(() => {
  if (!authStore.user?.email) return ''
  return authStore.user.email.charAt(0).toUpperCase()
})

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const handleLogout = async () => {
  const result = await authStore.signOut()
  if (result.success) {
    showProfileMenu.value = false
    isOpen.value = false
    router.push('/')
  }
}

const closeProfileMenu = (event) => {
  if (!event.target.closest('.relative')) {
    showProfileMenu.value = false
  }
}

onMounted(async () => {
  // Initialize auth state
  await authStore.initAuth()
  
  // Set dark mode based on system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  
  // Add click event listener to close profile menu
  document.addEventListener('click', closeProfileMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeProfileMenu)
})
</script>
