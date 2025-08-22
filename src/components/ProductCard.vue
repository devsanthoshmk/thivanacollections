<template>
  <Card class="card-modern bg-primary dark:bg-secondary rounded-xl shadow-lg overflow-hidden font-sans border border-gray-200 dark:border-gray-700">
    <template #header>
      <div class="img-hover-zoom relative">
        <router-link :to="'/product/' + product.id">
          <img :src="product.images[0]" @error="imageUrlAlt" :alt="product.name" class="w-full h-72 object-cover">
          <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <Button icon="pi pi-eye" class="p-button-rounded p-button-outlined opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </router-link>
        <div v-if="product.isNew" class="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">NEW</div>
        <div v-if="product.isSale" class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">SALE</div>
      </div>
    </template>
    <template #title>
      <router-link :to="'/product/' + product.id" class="block">
        <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary hover:text-accent dark:hover:text-accent transition-colors duration-300">{{ product.name }}</h3>
      </router-link>
    </template>
    <template #content>
      <div class="flex items-center justify-between mt-2">
        <p class="text-accent font-bold text-xl">${{ product.price }}</p>
        <div class="flex items-center">
          <vue-feather v-for="i in 5" :key="i" type="star" class="h-4 w-4 fill-current text-accent"></vue-feather>
        </div>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-2 h-10 overflow-hidden">{{ shortDescription }}</p>
    </template>
    <template #footer>
      <div class="flex flex-wrap mt-4 mb-2">
        <span v-for="tag in product.hashtags" :key="tag" class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full px-3 py-1 text-xs font-semibold mr-2 mb-2 hover:bg-accent hover:text-white transition-colors duration-300 cursor-pointer">{{ tag }}</span>
      </div>
      <div class="flex justify-between items-center mt-4">
        <Button icon="pi pi-heart" class="p-button-rounded p-button-outlined p-button-sm" @click="toggleWishlist" />
        <Button label="Add to Cart" class="p-button-sm" @click="addToCart" />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import Card from 'primevue/card';
import Button from 'primevue/button';
import VueFeather from 'vue-feather';
import { useCartStore } from '../store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart } = useCartStore()

const imageUrlAlt = (event) => {
  event.target.src = `https://placehold.co/400x400?text=${event.target.alt}`
}

const shortDescription = computed(() => {
  if (!props.product.discription) return ''
  return props.product.discription.split('.')[0]
})



const toggleWishlist = () => {
  // Implement wishlist functionality
  console.log('Toggle wishlist for product:', props.product.name)
}

const handleAddToCart = () => {
  addToCart(props.product)
}
</script>
