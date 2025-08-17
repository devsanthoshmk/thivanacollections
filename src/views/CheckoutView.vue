<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <div class="container mx-auto px-6 py-24">
      <h1 class="font-serif text-5xl font-bold text-center mb-12">Checkout</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 class="font-serif text-3xl font-bold mb-6">Shipping Information</h2>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label for="name" class="block mb-2 text-lg">Name</label>
                <InputText id="name" v-model="name" class="w-full p-inputtext-lg" />
              </div>
              <div>
                <label for="address" class="block mb-2 text-lg">Address</label>
                <InputText id="address" v-model="address" class="w-full p-inputtext-lg" />
              </div>
              <div>
                <label for="phone" class="block mb-2 text-lg">Phone</label>
                <InputText id="phone" v-model="phone" class="w-full p-inputtext-lg" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h2 class="font-serif text-3xl font-bold mb-6">Payment Information</h2>
            <div class="grid grid-cols-1 gap-6">
              <div>
                <label for="card" class="block mb-2 text-lg">Card Number</label>
                <InputText id="card" placeholder="**** **** **** ****" class="w-full p-inputtext-lg" />
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label for="expiry" class="block mb-2 text-lg">Expiry Date</label>
                  <InputText id="expiry" placeholder="MM/YY" class="w-full p-inputtext-lg" />
                </div>
                <div>
                  <label for="cvc" class="block mb-2 text-lg">CVC</label>
                  <InputText id="cvc" placeholder="***" class="w-full p-inputtext-lg" />
                </div>
              </div>
            </div>
            <Button label="Pay Now" class="w-full mt-8 p-button-lg bg-accent border-accent" @click="payNow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useCartStore } from '../store/cart';

const router = useRouter()
const { clearCart } = useCartStore()

const name = ref('')
const address = ref('')
const phone = ref('')

const payNow = () => {
  // Mock payment logic
  clearCart()
  router.push('/confirmation')
}
</script>
