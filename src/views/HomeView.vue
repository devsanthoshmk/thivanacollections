<template>
  <div class="bg-primary dark:bg-secondary">
    <!-- Hero Banner -->
    <section class="relative bg-cover bg-center h-[700px] md:h-[800px] text-white overflow-hidden" style="background-image: url('/images/banner-image-2.jpg')">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <div class="max-w-3xl">
          <h1 class="font-serif text-5xl md:text-7xl font-bold mb-6 text-gradient" data-aos="fade-up">Elevate Your Style</h1>
          <div class="divider mb-10" data-aos="fade-up" data-aos-delay="100">
            <span>Thivana Collections</span>
          </div>
          <p class="text-lg md:text-xl mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Discover our exclusive collection of premium clothing, crafted with precision and passion for the modern fashion enthusiast.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="400">
            <router-link to="/shop" class="btn-modern bg-accent text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">Shop Collection</router-link>
            <router-link to="/about" class="btn-modern glass text-white py-4 px-10 rounded-full font-bold text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">Our Story</router-link>
          </div>
        </div>
      </div>
      <div class="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce" data-aos="fade-up" data-aos-delay="600">
        <vue-feather type="chevron-down" class="h-8 w-8 text-white"></vue-feather>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-20 bg-gradient-to-b from-primary to-gray-50 dark:from-secondary dark:to-gray-900">
      <div class="container mx-auto px-6">
        <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary text-center mb-4" data-aos="fade-up">Explore Collections</h2>
        <p class="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Discover our curated collections designed for every style and occasion</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-modern bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden img-hover-zoom" data-aos="fade-up" data-aos-delay="200">
            <div class="h-64 bg-cover bg-center" style="background-image: url('/images/cat-item1.jpg')"></div>
            <div class="p-6">
              <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">Women's Collection</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Elegant and stylish clothing for the modern woman</p>
              <router-link to="/shop?category=women" class="text-accent font-semibold flex items-center">Explore Collection <vue-feather type="arrow-right" class="ml-2 h-4 w-4"></vue-feather></router-link>
            </div>
          </div>
          
          <div class="card-modern bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden img-hover-zoom" data-aos="fade-up" data-aos-delay="300">
            <div class="h-64 bg-cover bg-center" style="background-image: url('/images/cat-item2.jpg')"></div>
            <div class="p-6">
              <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">Men's Collection</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Sophisticated and contemporary fashion for men</p>
              <router-link to="/shop?category=men" class="text-accent font-semibold flex items-center">Explore Collection <vue-feather type="arrow-right" class="ml-2 h-4 w-4"></vue-feather></router-link>
            </div>
          </div>
          
          <div class="card-modern bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden img-hover-zoom" data-aos="fade-up" data-aos-delay="400">
            <div class="h-64 bg-cover bg-center" style="background-image: url('/images/cat-item3.jpg')"></div>
            <div class="p-6">
              <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">Accessories</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Complete your look with our premium accessories</p>
              <router-link to="/shop?category=accessories" class="text-accent font-semibold flex items-center">Explore Collection <vue-feather type="arrow-right" class="ml-2 h-4 w-4"></vue-feather></router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-24">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Featured Styles</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Handpicked pieces from our latest collection</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="(product, id) in paginatedProducts" :key="product.id" :product="{ ...product }" data-aos="fade-up"
          :data-aos-delay="100 * (Object.keys(paginatedProducts).indexOf(id) % 8)" />
        </div>
        
        <div class="text-center mt-12" data-aos="fade-up" data-aos-delay="500">
          <router-link to="/shop" class="btn-modern inline-block border-2 border-accent text-accent dark:text-accent py-3 px-8 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300">View All Products</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/5 dark:to-accent/2">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">What Our Clients Say</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Hear from our valued customers</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center mb-4">
              <div class="text-accent">
                <vue-feather v-for="i in 5" :key="i" type="star" class="fill-current h-5 w-5"></vue-feather>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 italic mb-6">"Absolutely stunning clothing! The quality is exceptional and the customer service is outstanding."</p>
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 mr-4"></div>
              <div>
                <h4 class="font-bold text-secondary dark:text-primary">Sarah Johnson</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">New York</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
            <div class="flex items-center mb-4">
              <div class="text-accent">
                <vue-feather v-for="i in 5" :key="i" type="star" class="fill-current h-5 w-5"></vue-feather>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 italic mb-6">"I've never seen such beautiful clothing. Every piece tells a story and feels incredibly special."</p>
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 mr-4"></div>
              <div>
                <h4 class="font-bold text-secondary dark:text-primary">Michael Chen</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">San Francisco</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="400">
            <div class="flex items-center mb-4">
              <div class="text-accent">
                <vue-feather v-for="i in 5" :key="i" type="star" class="fill-current h-5 w-5"></vue-feather>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 italic mb-6">"The perfect gift for my wife. She was absolutely thrilled with the dress. Thank you!"</p>
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 mr-4"></div>
              <div>
                <h4 class="font-bold text-secondary dark:text-primary">David Williams</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">London</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="py-20 bg-cover bg-center relative" style="background-image: url('/images/newsletter-image.jpg')">
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-white mb-4" data-aos="fade-up">Join Our Fashion Community</h2>
          <p class="text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="100">Subscribe to our newsletter for exclusive offers, new arrivals, and insider access to our latest collections.</p>
          
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="200">
            <input type="email" placeholder="Your email address" class="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-accent">
            <button class="btn-modern bg-accent text-white py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import VueFeather from 'vue-feather'
import { useProductsStore } from '../store/products'

const { products } = useProductsStore()

const featuredProducts = computed(() => {
  // return the first 4 products
  return Object.fromEntries(Object.entries(products.value).slice(0, 4))
})
console.log(featuredProducts)
</script>
