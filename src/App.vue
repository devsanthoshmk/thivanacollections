<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Maintenance Popup -->
    <Transition name="popup-fade">
      <div v-if="showMaintenancePopup" class="maintenance-overlay" @click.self="closePopup">
        <div class="maintenance-popup">
          <!-- Decorative gradient orbs -->
          <div class="orb orb-1"></div>
          <div class="orb orb-2"></div>
          
          <!-- Icon -->
          <div class="popup-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          <!-- Content -->
          <div class="popup-content">
            <span class="popup-badge">Preview Mode</span>
            <h2 class="popup-title">We're Almost There!</h2>
            <p class="popup-message">
              Welcome to <strong>Thivana Collections</strong>! Our website is currently under development 
              and not yet live. Feel free to explore our products and place sample orders to experience 
              our upcoming platform.
            </p>
            <div class="popup-note">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <span>Orders placed during this preview are for demonstration purposes only.</span>
            </div>
          </div>
          
          <!-- Action Button -->
          <button class="popup-button" @click="closePopup">
            <span>Explore Site</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <Navbar />
    <main class="flex-grow">
      <Toast />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './store/auth'
import { useOrdersStore } from './store/orders'
import { useCartStore } from './store/cart'
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const authStore = useAuthStore()
const ordersStore = useOrdersStore()
const cartStore = useCartStore()

const toast = useToast()

// Maintenance popup state
const showMaintenancePopup = ref(false)

const closePopup = () => {
  showMaintenancePopup.value = false
  sessionStorage.setItem('maintenancePopupDismissed', 'true')
}

onMounted(async () => {
  // Show maintenance popup if not already dismissed in this session
  const dismissed = sessionStorage.getItem('maintenancePopupDismissed')
  if (!dismissed) {
    showMaintenancePopup.value = true
  }

  // Initialize authentication state
  await authStore.initAuth()
  
  // Initialize cart based on authentication state
  await cartStore.initCart(toast)

  // Initialize orders if user is authenticated
  if (authStore.isAuthenticated.value) {
    await ordersStore.loadOrders()
  }
})

</script>

<style scoped>
/* Popup Transition */
.popup-fade-enter-active {
  animation: overlayFadeIn 0.4s ease-out;
}
.popup-fade-leave-active {
  animation: overlayFadeOut 0.3s ease-in;
}
.popup-fade-enter-active .maintenance-popup {
  animation: popupSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.popup-fade-leave-active .maintenance-popup {
  animation: popupSlideOut 0.3s ease-in;
}

@keyframes overlayFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes overlayFadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes popupSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes popupSlideOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
}

/* Overlay */
.maintenance-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Popup Container */
.maintenance-popup {
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 2.5rem 2rem 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  overflow: hidden;
  text-align: center;
}

/* Decorative Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  pointer-events: none;
}
.orb-1 {
  top: -40px;
  right: -40px;
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.orb-2 {
  bottom: -30px;
  left: -30px;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

/* Icon */
.popup-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin-bottom: 1.25rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 10px 30px -10px rgba(102, 126, 234, 0.5);
}
.popup-icon svg {
  width: 36px;
  height: 36px;
  color: white;
}

/* Content */
.popup-content {
  position: relative;
  z-index: 1;
}

.popup-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #764ba2;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.15) 100%);
  border-radius: 100px;
  border: 1px solid rgba(118, 75, 162, 0.2);
}

.popup-title {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.popup-message {
  margin: 0 0 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: #4a5568;
}
.popup-message strong {
  color: #1a1a2e;
  font-weight: 600;
}

.popup-note {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #5a6f8c;
  background: rgba(102, 126, 234, 0.06);
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.12);
  text-align: left;
}
.popup-note svg {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: #667eea;
}

/* Button */
.popup-button {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px -3px rgba(102, 126, 234, 0.4);
}
.popup-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -5px rgba(102, 126, 234, 0.5);
}
.popup-button:active {
  transform: translateY(0);
}
.popup-button svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}
.popup-button:hover svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 480px) {
  .maintenance-popup {
    padding: 2rem 1.5rem 1.5rem;
    border-radius: 20px;
  }
  .popup-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
  }
  .popup-icon svg {
    width: 30px;
    height: 30px;
  }
  .popup-title {
    font-size: 1.5rem;
  }
  .popup-message {
    font-size: 0.875rem;
  }
}
</style>