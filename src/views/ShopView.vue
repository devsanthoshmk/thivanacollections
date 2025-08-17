<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[400px] text-white overflow-hidden" style="background-image: url('/images/banner-image-5.jpg')">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 class="font-serif text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">Our Collection</h1>
        <div class="divider mb-6" data-aos="fade-up" data-aos-delay="100">
          <span>Exquisite Jewelry</span>
        </div>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Discover our curated selection of fine jewelry, crafted with precision and passion.</p>
      </div>
    </section>

    <!-- Filters and Products -->
    <div class="container mx-auto px-6 py-12">
      <!-- Filters Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12" data-aos="fade-up">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4 md:mb-0">Filter Products</h2>
          <div class="flex items-center">
            <span class="text-gray-600 dark:text-gray-400 mr-4">{{ totalRecords }} products found</span>
            <Button icon="pi pi-filter" label="More Filters" class="p-button-outlined p-button-sm" @click="showAdvancedFilters = !showAdvancedFilters" />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="w-full">
            <span class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Search</span>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search" />
              <InputText type="text" v-model="searchQuery" placeholder="Search for products..." class="w-full" />
            </span>
          </div>
          <div class="w-full">
            <span class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Category</span>
            <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="All Categories" class="w-full" />
          </div>
          <div class="w-full">
            <span class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Sort By</span>
            <Dropdown v-model="sortBy" :options="sortOptions" optionLabel="name" placeholder="Sort by" class="w-full" />
          </div>
        </div>
        
        <!-- Advanced Filters (Collapsible) -->
        <div v-if="showAdvancedFilters" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}</span>
              <Slider v-model="priceRange" :min="0" :max="500" :step="10" range class="mt-4" />
            </div>
            <div>
              <span class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Material</span>
              <div class="flex flex-wrap gap-2 mt-2">
                <Button label="Gold" class="p-button-outlined p-button-sm" :class="{'p-button-primary': selectedMaterials.includes('gold')}" @click="toggleMaterial('gold')" />
                <Button label="Silver" class="p-button-outlined p-button-sm" :class="{'p-button-primary': selectedMaterials.includes('silver')}" @click="toggleMaterial('silver')" />
                <Button label="Platinum" class="p-button-outlined p-button-sm" :class="{'p-button-primary': selectedMaterials.includes('platinum')}" @click="toggleMaterial('platinum')" />
                <Button label="Diamond" class="p-button-outlined p-button-sm" :class="{'p-button-primary': selectedMaterials.includes('diamond')}" @click="toggleMaterial('diamond')" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="Object.keys(paginatedProducts).length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="(product, id) in paginatedProducts" :key="id" :product="{...product, id}" data-aos="fade-up" :data-aos-delay="100 * (Object.keys(paginatedProducts).indexOf(id) % 8)" />
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
          <h2 class="font-serif text-3xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Stay Updated</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="100">Subscribe to our newsletter for new arrivals and exclusive offers</p>
          
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
