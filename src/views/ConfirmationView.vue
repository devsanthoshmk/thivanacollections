<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen flex items-center justify-center font-sans">
    <div class="text-center">
      <div class="bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg">
        <div class="flex justify-center mb-6">
          <vue-feather type="check-circle" class="h-24 w-24 text-accent"></vue-feather>
        </div>
        <h1 class="font-serif text-5xl font-bold mb-4">Thank You!</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">Your order has been placed successfully.</p>
        <router-link to="/shop">
          <Button label="Continue Shopping" class="p-button-lg" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import VueFeather from 'vue-feather';
</script>
