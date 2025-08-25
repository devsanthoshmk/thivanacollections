import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import ProductDetailsView from '../views/ProductDetailsView.vue'
import CartView from '../views/CartView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import CheckoutView from '../views/CheckoutView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import OrdersView from '../views/OrdersView.vue'
import OrderDetailsView from '../views/OrderDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/product/:id',
      name: 'product-details',
      component: ProductDetailsView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders/:id',
      name: 'order-details',
      component: OrderDetailsView,
      meta: { requiresAuth: true }
    },
  ],
   scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})

export default router