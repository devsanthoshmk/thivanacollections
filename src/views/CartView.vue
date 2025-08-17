<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-accent/10 to-accent/5 py-16">
      <div class="container mx-auto px-6">
        <h1 class="font-serif text-5xl font-bold text-center mb-4" data-aos="fade-up">Shopping Cart</h1>
        <p class="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Review your selected fashion items and proceed to checkout
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-12">
      <div v-if="cart.length > 0">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8" data-aos="fade-up">
              <h2 class="font-serif text-2xl font-bold mb-6 flex items-center">
                <vue-feather type="shopping-cart" class="h-6 w-6 mr-2 text-accent"></vue-feather>
                Your Items ({{ cart.length }})
              </h2>
              
              <div v-for="(item, index) in cart" :key="item.id"
                   class="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 card-modern"
                   data-aos="fade-up" :data-aos-delay="100 * index">
                <div class="flex items-center mb-4 md:mb-0">
                  <div class="img-hover-zoom rounded-lg overflow-hidden mr-6">
                    <img :src="'/' + item.images[0]" :alt="item.name" class="w-24 h-24 object-cover">
                  </div>
                  <div>
                    <h3 class="font-serif text-xl font-bold">{{ item.name }}</h3>
                    <p class="text-accent font-bold text-lg mt-1">${{ item.price }}</p>
                    <p v-if="item.category" class="text-gray-600 dark:text-gray-400 text-sm mt-1">{{ item.category }}</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="flex items-center mr-6">
                    <Button icon="pi pi-minus" class="p-button-rounded p-button-outlined p-button-sm" @click="decreaseQuantity(item)" />
                    <span class="mx-4 text-xl font-semibold w-8 text-center">{{ item.quantity }}</span>
                    <Button icon="pi pi-plus" class="p-button-rounded p-button-outlined p-button-sm" @click="increaseQuantity(item)" />
                  </div>
                  <Button class="p-button-danger p-button-rounded p-button-sm" @click="removeFromCart(item.id)">
                    <vue-feather type="trash-2" class="h-5 w-5"></vue-feather>
                  </Button>
                </div>
              </div>
            </div>
            
            <!-- Continue Shopping -->
            <div class="text-center" data-aos="fade-up" data-aos-delay="200">
              <router-link to="/shop" class="inline-flex items-center text-accent hover:text-accent/80 transition-colors">
                <vue-feather type="arrow-left" class="h-5 w-5 mr-2"></vue-feather>
                Continue Shopping
              </router-link>
            </div>
          </div>
          
          <div>
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sticky top-6 card-modern" data-aos="fade-left">
              <h2 class="font-serif text-2xl font-bold mb-6 flex items-center">
                <vue-feather type="file-text" class="h-6 w-6 mr-2 text-accent"></vue-feather>
                Order Summary
              </h2>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between">
                  <p class="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p>${{ cartTotal }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-600 dark:text-gray-400">Shipping</p>
                  <p class="text-green-600">Free</p>
                </div>
                <div class="flex justify-between">
                  <p class="text-gray-600 dark:text-gray-400">Taxes</p>
                  <p>$0.00</p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div class="flex justify-between font-bold text-xl">
                  <p>Total</p>
                  <p class="text-accent">${{ cartTotal }}</p>
                </div>
              </div>
              
              <div class="mb-6">
                <div class="flex items-center mb-3">
                  <vue-feather type="truck" class="h-5 w-5 text-accent mr-2"></vue-feather>
                  <p class="text-sm">Free shipping on fashion orders over $100</p>
                </div>
                <div class="flex items-center">
                  <vue-feather type="shield" class="h-5 w-5 text-accent mr-2"></vue-feather>
                  <p class="text-sm">Secure checkout</p>
                </div>
              </div>
              
              <router-link to="/checkout">
                <Button label="Proceed to Checkout" class="w-full p-button-lg btn-modern bg-accent border-accent flex items-center justify-center">
                  <vue-feather type="lock" class="h-5 w-5 mr-2"></vue-feather>
                  <span>Secure Checkout</span>
                </Button>
              </router-link>
              
              <div class="mt-6 flex justify-center space-x-4">
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                  <vue-feather type="credit-card" class="h-6 w-6"></vue-feather>
                </a>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                  <vue-feather type="smartphone" class="h-6 w-6"></vue-feather>
                </a>
                <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                  <vue-feather type="globe" class="h-6 w-6"></vue-feather>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-24" data-aos="fade-up">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 mb-6">
          <vue-feather type="shopping-bag" class="h-12 w-12 text-accent"></vue-feather>
        </div>
        <h2 class="font-serif text-4xl font-bold mb-4">Your cart is empty</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">Looks like you haven't added any fashion items to your cart yet. Start shopping to fill it up!</p>
        <router-link to="/shop">
          <Button label="Continue Shopping" class="p-button-lg btn-modern flex items-center justify-center">
            <vue-feather type="arrow-right" class="h-5 w-5 mr-2"></vue-feather>
            <span>Start Shopping</span>
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'
import Button from 'primevue/button';
import VueFeather from 'vue-feather';

const { cart, removeFromCart, cartTotal, updateQuantity } = useCartStore()

const increaseQuantity = (item) => {
  updateQuantity(item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    updateQuantity(item.id, item.quantity - 1)
  }
}
</script>
