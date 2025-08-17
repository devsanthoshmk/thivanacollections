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
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VueFeather from 'vue-feather';
import { useCartStore } from '../store/cart'

const { cartCount } = useCartStore()
const isOpen = ref(false)
const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
