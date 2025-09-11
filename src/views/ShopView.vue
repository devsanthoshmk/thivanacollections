<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[400px] text-white overflow-hidden"
      style="background-image: url('/images/banner-image-5.jpg')">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 class="font-serif text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">Our Collection</h1>
        <div class="divider mb-6" data-aos="fade-up" data-aos-delay="100">
          <span>Premium Fashion</span>
        </div>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Discover our curated
          selection of premium clothing, crafted with precision and passion.</p>
      </div>
    </section>

    <!-- Filters and Products -->
    <div class="container mx-auto px-6 py-12">
      <!-- Filters Section -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12" data-aos="fade-up">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 class="font-serif text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Filter Clothing</h2>
          <div class="flex items-center">
            <span class="text-gray-600 dark:text-gray-400 mr-4">{{ totalRecords }} items found</span>
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
  <label class="block mb-2 font-medium text-gray-700 dark:text-gray-300">Search</label>
  <div class="relative w-full">
    <!-- Icon -->
    <i class="pi pi-search !absolute !left-3 !top-1/2 !-translate-y-1/2 !text-gray-400"></i>
    <!-- Input -->
    <InputText
      v-model="searchQuery"
      placeholder="Search for clothing..."
      class="!w-full !pl-10 !pr-3 !py-2"
      showClear
    />
  </div>
</div>

            <div class="w-full">
    <label class="block mb-2 font-medium text-gray-700 dark:text-gray-300">Category</label>
    <TreeSelect
      v-model="selectedCategory"
      :options="treeNodes"
      placeholder="All Categories"
      class="w-full"
      :filter="true"
      selectionMode="single"
      appendTo="body"
      showClear
    />
  </div>
         <div class="w-full">
    <label class="block mb-2 font-medium text-gray-700 dark:text-gray-300">Sort By</label>
    <Dropdown
      v-model="sortBy"
      :options="sortOptions"
      optionLabel="name"
      optionValue="value"
      placeholder="Sort by"
      class="w-full"
      showClear
    />
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
              <label class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Fabric</label>
              <div class="flex flex-wrap gap-2 mt-2">
                <button v-for="material in fabricOptions" :key="material.value"
                  class="px-3 py-1 text-sm font-medium rounded-md border transition-colors"
                  :class="selectedMaterials.includes(material.value)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'" @click="toggleMaterial(material.value)">
                  {{ material.name.charAt(0).toUpperCase() + material.name.slice(1) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="Object.keys(paginatedProducts).length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard v-for="(product, id) in paginatedProducts" :key="product.id" :product="{ ...product }" data-aos="fade-up"
          :data-aos-delay="100 * (Object.keys(paginatedProducts).indexOf(id) % 8)" />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-16">
        <vue-feather type="search" class="h-16 w-16 text-gray-400 mx-auto mb-4"></vue-feather>
        <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">No items found</h3>
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
          <h2 class="font-serif text-3xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Fashion
            Updates</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="100">Subscribe to our
            newsletter for new collections and exclusive offers</p>

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
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import VueFeather from 'vue-feather'
import { useProductsStore } from '../store/products'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import Paginator from 'primevue/paginator';
import Button from 'primevue/button';
import TreeSelect from 'primevue/treeselect';
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()



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


const treeNodes = computed(() => {
  const map = new Map() // main_category => Set of categories

  for (const id in products.value) {
    const product = products.value[id]
    if (!map.has(product.main_category)) {
      map.set(product.main_category, new Set())
    }
    map.get(product.main_category).add(product.category)
  }

  // Convert to PrimeVue TreeSelect format
  const nodes = []
  for (const [mainCat, subCats] of map.entries()) {
    nodes.push({
      label: mainCat,
      key: mainCat.replace(/\s+/g, "-").toLowerCase(),
      children: Array.from(subCats).map(sub => ({
        label: sub,
        key: (mainCat + "-" + sub).replace(/\s+/g, "-").toLowerCase()
      }))
    })
  }

  return nodes
})

const categories = computed(() => {
  const categories = new Set()
  for (const id in products.value) {
    categories.add(products.value[id].category)
  }
  return [ ...Array.from(categories).map(c => ({ name: c, value: c }))]
})

const fabricOptions = computed(() => {
  const fabrics = new Set()
  for (const id in products.value) {
    fabrics.add(products.value[id].fabric)
  }
  return [ ...Array.from(fabrics).map(f => ({ name: f, value: f }))]
})

const filteredProducts = computed(() => {
  let filtered = Object.values(products.value)

  if (searchQuery.value) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }

  if (selectedCategory.value) {
    console.log('Filtering by category:',Object.keys(selectedCategory.value)[0]);
    filtered = filtered.filter(p => {
    const parentKey = p.main_category.replace(/\s+/g, "-").toLowerCase()
    const childKey = p.category.replace(/\s+/g, "-").toLowerCase()

    // If user selected parent, include all children
    if (Object.keys(selectedCategory.value)[0] === parentKey) return true

    // If user selected child, check exact match
    return Object.keys(selectedCategory.value)[0] === `${parentKey}-${childKey}`
  })
    console.log('After category filter:', filtered);
  }

  filtered = filtered.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])

  if (selectedMaterials.value.length > 0) {
    filtered = filtered.filter(p => {
      console.log(p.fabric, selectedMaterials.value);
      return selectedMaterials.value.some(material =>
        // p.discription && p.discription.toLowerCase().includes(material.toLowerCase()) getting the fabric type with discription
        material === p.fabric
      )
    })
  }

  // Apply sorting
  if (sortBy.value) {
    switch (sortBy.value) {
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
      console.log('Sorting by:', sortBy.value, filtered,filtered.reduce((acc, p) => {
    const id = Object.keys(products.value).find(key => products.value[key] === p)
    acc[id] = p
    return acc
  }, {}));
  }

  updateQueryParams()
  return filtered
})

const totalRecords = computed(() => Object.keys(filteredProducts.value).length)

const paginatedProducts = computed(() => {
  const start = currentPage.value * rows.value
  const end = start + rows.value
  console.log('Paginated Products:', Object.fromEntries(Object.entries(filteredProducts.value).slice(start, end)) )
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
  router.replace({ query: {} })
}


const initFiltersFromQuery = () => {
  const { search, category, minPrice, maxPrice, materials, sort } = route.query

  if (search) searchQuery.value = search
  if (category) selectedCategory.value = { [category]: true }
  if (minPrice && maxPrice) priceRange.value = [Number(minPrice), Number(maxPrice)]
  if (materials) selectedMaterials.value = materials.split(',')
  if (sort) sortBy.value = sort
}

const updateQueryParams = () => {
  const query = {
    search: searchQuery.value || undefined,
    category: selectedCategory.value ? Object.keys(selectedCategory.value)[0] : undefined,
    minPrice: priceRange.value[0] !== 0 ? priceRange.value[0] : undefined,
    maxPrice: priceRange.value[1] !== 500 ? priceRange.value[1] : undefined,
    materials: selectedMaterials.value.length ? selectedMaterials.value.join(',') : undefined,
    sort: sortBy.value || undefined,
  }
    const url = new URL(window.location.href)
   Object.keys(query).forEach(key => {
    if (query[key] === null || query[key] === undefined || query[key] === '' || 
        (Array.isArray(query[key]) && query[key].length === 0)) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, query[key])
    }
  })

  // Replace the current URL without reloading the page
  history.replaceState(null, '', url.toString())
}

initFiltersFromQuery()
</script>
