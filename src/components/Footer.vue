<template>
  <footer class="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white pt-16 pb-8">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2" data-aos="fade-up">
          <div class="flex items-center mb-4">
            <img src="../assets/logo.jpg" alt="Thivana Collections Logo" class="h-12 mr-3">
            <span class="font-serif text-2xl font-bold text-secondary dark:text-primary">Thivana Collections</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">Crafting timeless fashion since 2010. Our clothing is designed to celebrate your personal style with exceptional craftsmanship and attention to detail.</p>
          <div class="flex space-x-4">
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white text-gray-600 dark:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <vue-feather type="facebook" class="h-5 w-5"></vue-feather>
            </a>
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white text-gray-600 dark:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <vue-feather type="instagram" class="h-5 w-5"></vue-feather>
            </a>
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white text-gray-600 dark:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <vue-feather type="twitter" class="h-5 w-5"></vue-feather>
            </a>
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white text-gray-600 dark:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <vue-feather type="youtube" class="h-5 w-5"></vue-feather>
            </a>
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-accent hover:text-white text-gray-600 dark:text-gray-300 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <vue-feather type="linkedin" class="h-5 w-5"></vue-feather>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div data-aos="fade-up" data-aos-delay="100">
          <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">Home</router-link>
            </li>
            <li>
              <router-link to="/shop" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">Shop</router-link>
            </li>
            <li>
              <router-link to="/about" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">About Us</router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">Contact</router-link>
            </li>
          </ul>
        </div>
        
        <!-- Contact Info -->
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-4">Contact Us</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <vue-feather type="map-pin" class="h-5 w-5 text-accent mr-3 mt-0.5"></vue-feather>
              <span class="text-gray-600 dark:text-gray-400">123 Fashion Street, Mumbai, Maharashtra 400001</span>
            </li>
            <li class="flex items-center">
              <vue-feather type="phone" class="h-5 w-5 text-accent mr-3"></vue-feather>
              <span class="text-gray-600 dark:text-gray-400">+91 22 1234 5678</span>
            </li>
            <li class="flex items-center">
              <vue-feather type="mail" class="h-5 w-5 text-accent mr-3"></vue-feather>
              <span class="text-gray-600 dark:text-gray-400">info@thivanacollections.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12" data-aos="fade-up" data-aos-delay="300">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-2">Subscribe to Our Newsletter</h3>
            <p class="text-gray-600 dark:text-gray-400">Get the latest updates on new fashion collections and exclusive offers.</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input type="email" placeholder="Your email address" class="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700 flex-grow">
            <button class="btn-modern bg-accent text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300">Subscribe</button>
          </div>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-gray-300 dark:border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; 2025 Thivana Collections. All rights reserved.
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">Privacy Policy</a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">Terms of Service</a>
            <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors duration-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import VueFeather from 'vue-feather';
</script>