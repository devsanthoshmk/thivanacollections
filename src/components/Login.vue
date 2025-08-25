<template>
        <div class="container mx-auto px-6 py-12">
      <div class="max-w-md mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" data-aos="fade-up">
          <div v-if="authStore.error.value" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ authStore.error }}. Make sure you confirmed you email with the confirmation link sent to your inbox.
          </div>
          
          <form @submit.prevent="handleLogin">
            <div class="mb-6">
              <label for="email" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email</label>
              <InputText 
                id="email" 
                v-model="email" 
                type="email" 
                class="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div class="mb-6">
              <label for="password" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Password</label>
              <Password 
                id="password" 
                v-model="password" 
                class="w-full"
                :feedback="false"
                toggleMask
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div class="mb-6">
              <Button 
                type="submit" 
                label="Login" 
                class="w-full p-button-lg btn-modern bg-accent border-accent"
                :loading="authStore.loading.value"
              />
            </div>
          </form>
          
          <div class="text-center mt-6">
            <p class="text-gray-600 dark:text-gray-400">
              Don't have an account? 
              <router-link v-if="redirect" to="/signup" class="text-accent hover:text-accent/80 font-medium">Sign up</router-link>
              <button v-else @click="$emit('to-signup')" class="text-accent hover:text-accent/80 font-medium">Sign up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useAuthStore } from '../store/auth'

const props = defineProps({
  redirect: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['login-success'])

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const result = await authStore.signIn(email.value, password.value)
  
    if (result.success) {
      if (props.redirect) {
        router.push('/')
      } else {
        emit('login-success')
      }
    }
}
</script>