import { ref, computed } from 'vue'
import productsData from '../../products.json'

const products = ref(productsData)

export const useProductsStore = () => {

  const getProductById = (id) => {
    return computed(() => products.value[id])
  }

  const getProductsByCategory = (category, currentProductId) => {
    return computed(() => {
      const filtered = Object.entries(products.value).filter(([id, product]) => {
        return product.category === category && id !== currentProductId
      })
      return Object.fromEntries(filtered.slice(0, 4))
    })
  }

  return { products, getProductById, getProductsByCategory }
}