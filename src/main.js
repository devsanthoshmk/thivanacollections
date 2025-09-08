import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'   // ✅ Aura preset (light/dark built-in)
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

import AOS from 'aos'
import 'aos/dist/aos.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,    // Aura supports multiple color schemes (light/dark)
    options: {
      prefix: 'p',
      darkModeSelector: 'dark', // you can toggle light/dark by adding/removing "dark" class to <html>
      cssLayer: false,
    },
  },
  ripple: true,
  inputStyle: 'filled',
  zIndex: {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100
  }
})

app.use(ToastService);

app.mount('#app')

AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
  offset: 100
})
