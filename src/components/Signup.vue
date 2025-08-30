<template>
   <div class="container mx-auto px-6 py-12">
      <div class="max-w-md mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" data-aos="fade-up">
          <div v-if="authStore.error.value" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {{ authStore.error }}
          </div>
          
          <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {{ successMessage }}
          </div>
          
          <form @submit.prevent="handleSignup">
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
                :feedback="true"
                toggleMask
                placeholder="Create a password"
                required
              />
            </div>
            
            <div class="mb-6">
              <label for="confirmPassword" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Confirm Password</label>
              <Password 
                id="confirmPassword" 
                v-model="confirmPassword" 
                class="w-full"
                :feedback="false"
                toggleMask
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <div class="mb-6">
              <Button 
                type="submit" 
                label="Sign Up" 
                class="w-full p-button-lg btn-modern bg-accent border-accent"
                :loading="authStore.loading.value"
              />
            </div>
          </form>
          
          <div class="text-center mt-6">
            <p class="text-gray-600 dark:text-gray-400">
              Already have an account? 
              <router-link v-if="redirect" to="/login" class="text-accent hover:text-accent/80 font-medium">Login</router-link>
                <button v-else @click="loginclick" class="text-accent hover:text-accent/80 font-medium">Login</button>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const props = defineProps({
    redirect: { type: Boolean, default: true },
})

const emit = defineEmits(['signup-success', 'to-login'])
const loginclick = () => emit('to-login',true);

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const successMessage = ref('')

const handleSignup = async () => {
  if (password.value !== confirmPassword.value) {
    authStore.error = 'Passwords do not match'
    return
  }

  const result = await authStore.signUp(email.value, password.value)

  if (result.success) {
    successMessage.value = 'Account created successfully! Please check your email to verify your account.'
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    if (authStore.isAuthenticated.value && authStore.user.value?.id) {
      emit('signup-success')
    }
  }
}
</script>



