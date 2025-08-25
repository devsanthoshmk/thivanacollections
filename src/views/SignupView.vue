<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-accent/10 to-accent/5 py-16">
      <div class="container mx-auto px-6">
        <h1 class="font-serif text-5xl font-bold text-center mb-4" data-aos="fade-up">Sign Up</h1>
        <p class="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Create an account to start shopping and track your orders
        </p>
      </div>
    </div>

    <Signup />

  </div>
</template>

<script setup>
import Signup from '@/components/Signup.vue'


</script>