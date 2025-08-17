<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[400px] text-white overflow-hidden"
      style="background-image: url('/images/banner-image-5.jpg')">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 class="font-serif text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">Our Collection</h1>
        <div class="divider mb-6" data-aos="fade-up" data-aos-delay="100">
          <span>Exquisite Jewelry</span>
        </div>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Discover our curated
          selection of fine jewelry, crafted with precision and passion.</p>
      </div>
    </section>

    <!-- Filters and Products -->
    <div class="container mx-auto px-6 py-12">
      <!-- Filters Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12" data-aos="fade-up">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 class="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Filter Products</h2>
          <div class="flex items-center">
            <span class="text-gray-600 dark:text-gray-400 mr-4">{{ totalRecords }} products found</span>
            <button
              class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="showAdvancedFilters = !showAdvancedFilters">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z">
                </path>
              </svg>
              More Filters
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="w-full">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Search</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input type="text" v-model="searchQuery" placeholder="Search for products..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div class="w-full">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category</label>
            <select v-model="selectedCategory"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="w-full">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Sort By</label>
            <select v-model="sortBy"
              class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Sort by</option>
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Advanced Filters (Collapsible) -->
        <div v-if="showAdvancedFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}
              </label>
              <!-- Note: You'll need a custom slider component or library like noUiSlider for the range slider -->
              <div class="flex items-center space-x-4 mt-4">
                <input type="range" :min="0" :max="500" :step="10" v-model="priceRange[0]"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
                <input type="range" :min="0" :max="500" :step="10" v-model="priceRange[1]"
                  class="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
              </div>
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Material</label>
              <div class="flex flex-wrap gap-2 mt-2">
                <button v-for="material in ['gold', 'silver', 'platinum', 'diamond']" :key="material"
                  class="px-3 py-1 text-sm font-medium rounded-md border transition-colors"
                  :class="selectedMaterials.includes(material)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'" @click="toggleMaterial(material)">
                  {{ material.charAt(0).toUpperCase() + material.slice(1) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="Object.keys(paginatedProducts).length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="(product, id) in paginatedProducts" :key="id" :product="{ ...product, id }" data-aos="fade-up"
          :data-aos-delay="100 * (Object.keys(paginatedProducts).indexOf(id) % 8)" />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-16">
        <vue-feather type="search" class="h-16 w-16 text-gray-400 mx-auto mb-4"></vue-feather>
        <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">No products found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your filters or search terms</p>
        <Button label="Reset Filters" class="p-button-outlined" @click="resetFilters" />
      </div>

      <!-- Pagination -->
      <div v-if="totalRecords > rows" class="flex justify-center mt-12" data-aos="fade-up">
        <Paginator :rows="rows" :totalRecords="totalRecords" @page="onPageChange"></Paginator>
      </div>
    </div>

    <!-- Newsletter Section -->
    <section class="py-16 bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/5 dark:to-accent/2">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="font-serif text-3xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Stay
            Updated</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="100">Subscribe to our
            newsletter for new arrivals and exclusive offers</p>

          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="200">
            <InputText type="email" placeholder="Your email address" class="flex-grow" />
            <Button label="Subscribe" class="p-button-primary" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import VueFeather from 'vue-feather'
import { useProductsStore } from '../store/products'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';

const { products } = useProductsStore()
const searchQuery = ref('')
const selectedCategory = ref(null)
const priceRange = ref([0, 500])
const currentPage = ref(0)
const rows = ref(8)
const showAdvancedFilters = ref(false)
const selectedMaterials = ref([])
const sortBy = ref(null)

const sortOptions = ref([
  { name: 'Featured', value: 'featured' },
  { name: 'Price: Low to High', value: 'priceAsc' },
  { name: 'Price: High to Low', value: 'priceDesc' },
  { name: 'Name: A to Z', value: 'nameAsc' },
  { name: 'Name: Z to A', value: 'nameDesc' }
])

const categories = computed(() => {
  const categories = new Set()
  for (const id in products.value) {
    categories.add(products.value[id].category)
  }
  return [{ name: 'All', value: null }, ...Array.from(categories).map(c => ({ name: c, value: c }))]
})

const filteredProducts = computed(() => {
  let filtered = Object.values(products.value)

  if (searchQuery.value) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }

  if (selectedCategory.value && selectedCategory.value.value) {
    filtered = filtered.filter(p => p.category === selectedCategory.value.value)
  }

  filtered = filtered.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  if (selectedMaterials.value.length > 0) {
    filtered = filtered.filter(p => {
      return selectedMaterials.value.some(material =>
        p.discription && p.discription.toLowerCase().includes(material.toLowerCase())
      )
    })
  }

  // Apply sorting
  if (sortBy.value) {
    switch (sortBy.value.value) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'nameAsc':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // Featured - no specific sorting
        break
    }
  }

  return filtered.reduce((acc, p) => {
    const id = Object.keys(products.value).find(key => products.value[key] === p)
    acc[id] = p
    return acc
  }, {})
})

const totalRecords = computed(() => Object.keys(filteredProducts.value).length)

const paginatedProducts = computed(() => {
  const start = currentPage.value * rows.value
  const end = start + rows.value
  return Object.fromEntries(Object.entries(filteredProducts.value).slice(start, end))
})

const onPageChange = (event) => {
  currentPage.value = event.page
}

const toggleMaterial = (material) => {
  const index = selectedMaterials.value.indexOf(material)
  if (index > -1) {
    selectedMaterials.value.splice(index, 1)
  } else {
    selectedMaterials.value.push(material)
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = null
  priceRange.value = [0, 500]
  selectedMaterials.value = []
  sortBy.value = null
  currentPage.value = 0
}
</script>
