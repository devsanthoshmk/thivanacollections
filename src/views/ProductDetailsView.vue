<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Breadcrumb -->
    <div class="container mx-auto px-6 py-6">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent">
              <vue-feather type="home" class="h-5 w-5"></vue-feather>
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <vue-feather type="chevron-right" class="h-5 w-5 text-gray-400"></vue-feather>
              <router-link to="/shop" class="ml-1 text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent md:ml-2">Shop</router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <vue-feather type="chevron-right" class="h-5 w-5 text-gray-400"></vue-feather>
              <span class="ml-1 text-gray-500 dark:text-gray-400 md:ml-2" aria-current="page">{{ product?.name || 'Product' }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>

    <div class="container mx-auto px-6 pb-24">
      <div v-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Product Images -->
        <div data-aos="fade-right">
          <div class="mb-4 img-hover-zoom rounded-xl overflow-hidden shadow-xl">
            <img :src="'/' + product.images[activeImageIndex]" :alt="product.name" class="w-full h-auto object-cover">
          </div>
          
          <!-- Thumbnail Gallery -->
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(image, index) in product.images" :key="index"
                 class="cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300"
                 :class="activeImageIndex === index ? 'border-accent' : 'border-transparent'"
                 @click="activeImageIndex = index">
              <img :src="'/' + image" :alt="`${product.name} ${index + 1}`" class="w-full h-24 object-cover">
            </div>
          </div>
        </div>
        
        <!-- Product Details -->
        <div data-aos="fade-left">
          <div class="mb-2">
            <span v-if="product.category" class="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">{{ product.category }}</span>
          </div>
          
          <h1 class="font-serif text-4xl md:text-5xl font-bold mb-4">{{ product.name }}</h1>
          
          <div class="flex items-center mb-6">
            <div class="flex items-center mr-4">
              <vue-feather v-for="i in 5" :key="i" type="star" class="h-5 w-5 fill-current text-accent"></vue-feather>
            </div>
            <span class="text-gray-600 dark:text-gray-400">(24 reviews)</span>
          </div>
          
          <div class="mb-8">
            <p class="text-accent font-bold text-3xl mb-2">${{ product.price }}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">Free shipping on orders over $100</p>
          </div>
          
          <div class="mb-8">
            <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-3">Description</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ product.discription }}</p>
          </div>
          
          <!-- Product Options -->
          <div class="mb-8">
            <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-3">Quantity</h3>
            <div class="flex items-center">
              <Button icon="pi pi-minus" class="p-button-rounded p-button-outlined p-button-sm" @click="decreaseQuantity" />
              <span class="mx-4 text-xl font-semibold w-8 text-center">{{ quantity }}</span>
              <Button icon="pi pi-plus" class="p-button-rounded p-button-outlined p-button-sm" @click="increaseQuantity" />
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <Button @click="addToCartWithQuantity" class="btn-modern flex-1 p-button-lg flex items-center justify-center">
              <vue-feather type="shopping-cart" class="h-5 w-5 mr-2"></vue-feather>
              <span>Add to Cart</span>
            </Button>
            <Button @click="buyNowWithQuantity" class="btn-modern flex-1 p-button-lg bg-accent border-accent flex items-center justify-center">
              <vue-feather type="zap" class="h-5 w-5 mr-2"></vue-feather>
              <span>Buy Now</span>
            </Button>
          </div>
          
          <!-- Product Features -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-4">Product Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center">
                <vue-feather type="check-circle" class="h-5 w-5 text-accent mr-2"></vue-feather>
                <span class="text-gray-600 dark:text-gray-400">Authentic Materials</span>
              </div>
              <div class="flex items-center">
                <vue-feather type="check-circle" class="h-5 w-5 text-accent mr-2"></vue-feather>
                <span class="text-gray-600 dark:text-gray-400">Handcrafted</span>
              </div>
              <div class="flex items-center">
                <vue-feather type="check-circle" class="h-5 w-5 text-accent mr-2"></vue-feather>
                <span class="text-gray-600 dark:text-gray-400">1 Year Warranty</span>
              </div>
              <div class="flex items-center">
                <vue-feather type="check-circle" class="h-5 w-5 text-accent mr-2"></vue-feather>
                <span class="text-gray-600 dark:text-gray-400">Gift Box Included</span>
              </div>
            </div>
          </div>
          
          <!-- Share & Wishlist -->
          <div class="flex items-center mt-8 space-x-4">
            <Button icon="pi pi-heart" class="p-button-rounded p-button-outlined" label="Add to Wishlist" />
            <span class="text-gray-600 dark:text-gray-400">Share:</span>
            <div class="flex space-x-2">
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                <vue-feather type="facebook" class="h-5 w-5"></vue-feather>
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                <vue-feather type="twitter" class="h-5 w-5"></vue-feather>
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                <vue-feather type="instagram" class="h-5 w-5"></vue-feather>
              </a>
              <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent">
                <vue-feather type="linkedin" class="h-5 w-5"></vue-feather>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-16">
        <vue-feather type="alert-circle" class="h-16 w-16 text-gray-400 mx-auto mb-4"></vue-feather>
        <h2 class="font-serif text-3xl font-bold text-secondary dark:text-primary mb-2">Product Not Found</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <router-link to="/shop">
          <Button label="Continue Shopping" class="p-button-lg" />
        </router-link>
      </div>

      <!-- Product Tabs -->
      <section v-if="product" class="mt-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" data-aos="fade-up">
        <Tabs value="0">
          <TabList>
            <Tab value="0">Description</Tab>
            <Tab value="1">Reviews</Tab>
            <Tab value="2">Shipping</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="prose max-w-none">
                <p>{{ product.discription }}</p>
                <p class="mt-4">Each piece in our collection is meticulously crafted by skilled artisans who bring years of expertise and passion to their work. We source only the finest materials to ensure that every item meets our exacting standards of quality and beauty.</p>
                <p class="mt-4">Whether you're looking for a statement piece for a special occasion or an everyday accessory that adds a touch of elegance to your ensemble, our collection offers something for every style and preference.</p>
              </div>
            </TabPanel>
            <TabPanel value="1">
              <div class="space-y-6">
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div class="flex items-center mb-2">
                    <div class="text-accent">
                      <vue-feather v-for="i in 5" :key="i" type="star" class="fill-current h-5 w-5"></vue-feather>
                    </div>
                    <span class="ml-2 font-semibold">Sarah Johnson</span>
                    <span class="ml-auto text-gray-500 dark:text-gray-400 text-sm">2 days ago</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400">Absolutely stunning piece! The craftsmanship is exceptional and it looks even better in person. Highly recommend!</p>
                </div>
                <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
                  <div class="flex items-center mb-2">
                    <div class="text-accent">
                      <vue-feather v-for="i in 5" :key="i" type="star" class="fill-current h-5 w-5"></vue-feather>
                    </div>
                    <span class="ml-2 font-semibold">Michael Chen</span>
                    <span class="ml-auto text-gray-500 dark:text-gray-400 text-sm">1 week ago</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400">Bought this as an anniversary gift for my wife and she absolutely loves it. The quality is outstanding and the packaging was beautiful.</p>
                </div>
                <div>
                  <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-4">Write a Review</h3>
                  <div class="space-y-4">
                    <div>
                      <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Rating</label>
                      <div class="flex space-x-1">
                        <vue-feather v-for="i in 5" :key="i" type="star" class="h-6 w-6 cursor-pointer text-gray-300 hover:text-accent"></vue-feather>
                      </div>
                    </div>
                    <div>
                      <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Review</label>
                      <textarea rows="4" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700"></textarea>
                    </div>
                    <Button label="Submit Review" class="p-button-primary" />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div class="space-y-4">
                <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary mb-4">Shipping & Returns</h3>
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-secondary dark:text-primary mb-2">Shipping</h4>
                    <p class="text-gray-600 dark:text-gray-400">We offer free standard shipping on all orders over $100. Standard shipping takes 3-5 business days. Express shipping options are available at checkout.</p>
                  </div>
                  <div>
                    <h4 class="font-semibold text-secondary dark:text-primary mb-2">Returns</h4>
                    <p class="text-gray-600 dark:text-gray-400">We accept returns within 30 days of purchase. Items must be in their original condition with all tags attached. Please contact our customer service team to initiate a return.</p>
                  </div>
                  <div>
                    <h4 class="font-semibold text-secondary dark:text-primary mb-2">International Shipping</h4>
                    <p class="text-gray-600 dark:text-gray-400">We ship to over 25 countries worldwide. International shipping rates and delivery times vary depending on the destination.</p>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>

      <!-- Related Products -->
      <section v-if="relatedProducts && Object.keys(relatedProducts).length" class="mt-24">
        <div class="text-center mb-12">
          <h2 class="font-serif text-4xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">You May Also Like</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Discover more pieces from our collection</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard v-for="(relatedProduct, id) in relatedProducts" :key="id" :product="{...relatedProduct, id}" data-aos="fade-up" :data-aos-delay="100 * (Object.keys(relatedProducts).indexOf(id) % 4)" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'
import Carousel from 'primevue/carousel';
import Button from 'primevue/button';
import ProductCard from '../components/ProductCard.vue'
import VueFeather from 'vue-feather';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const route = useRoute()
const router = useRouter()
const { getProductById, getProductsByCategory } = useProductsStore()
const { addToCart } = useCartStore()

const activeImageIndex = ref(0)
const quantity = ref(1)

const product = computed(() => {
  const productsStore = useProductsStore();
  return productsStore.getProductById(route.params.id).value;
});

const relatedProducts = computed(() => {
  if (!product.value) return {}
  const productsStore = useProductsStore();
  return productsStore.getProductsByCategory(product.value.category, route.params.id).value
})

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCartWithQuantity = () => {
  if (product.value) {
    const productWithQuantity = { ...product.value, quantity: quantity.value }
    addToCart(productWithQuantity)
  }
}

const buyNowWithQuantity = () => {
  addToCartWithQuantity()
  router.push('/checkout')
}

const buyNow = (product) => {
  addToCart(product)
  router.push('/checkout')
}
</script>
