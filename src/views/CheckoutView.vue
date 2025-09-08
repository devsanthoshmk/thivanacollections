<template>
  <div class="bg-primary dark:bg-secondary text-secondary dark:text-primary min-h-screen font-sans">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-accent/10 to-accent/5 py-16">
      <div class="container mx-auto px-6">
        <h1 class="font-serif text-5xl font-bold text-center mb-4" data-aos="fade-up">
          Checkout
        </h1>
        <p class="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up"
          data-aos-delay="100">
          Complete your order
        </p>
      </div>
    </div>

    <div class="container mx-auto px-6 py-12">
      <div  v-if="firstTimeUser">
        <div class="flex flex-col items-center text-center md:flex-row md:justify-center md:text-left">

          <!-- Icon -->
          <vue-feather type="user-plus" class="h-8 w-8 text-accent mt-4 md:mt-0 md:mr-3" />

          <!-- Text -->
          <h2 class="font-serif text-2xl font-bold mb-4 md:mb-0">
            First time here? Create an account to speed up your checkout
            process!
          </h2>
        </div>

        <!-- Signup form -->
        <Signup v-if="!showLogin" :redirect="false" @signup-success="handleSuccess"
          @to-login="handleLoginClick" />
        <Login v-else :redirect="false" @to-signup="handleSignupClick" @login-success="handleSuccess" />

      </div>
      
        <div v-if="cart.length === 0" class="text-center py-24" data-aos="fade-up">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 mb-6">
            <vue-feather type="shopping-cart" class="h-12 w-12 text-accent"></vue-feather>
          </div>
          <h2 class="font-serif text-4xl font-bold mb-4">Your cart is empty</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            Add some items to your cart to proceed with checkout.
          </p>
          <router-link to="/shop">
            <Button label="Continue Shopping" class="p-button-lg btn-modern flex items-center justify-center">
              <vue-feather type="arrow-right" class="h-5 w-5 mr-2"></vue-feather>
              <span>Continue Shopping</span>
            </Button>
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div class="lg:col-span-2">
            <!-- Shipping Information -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 card-modern" data-aos="fade-up">
              <h2 class="font-serif text-2xl font-bold mb-6 flex items-center">
                <vue-feather type="map-pin" class="h-6 w-6 mr-2 text-accent"></vue-feather>
                Shipping Information
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input v-model="shippingInfo.fullName" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input v-model="shippingInfo.phone" type="tel"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
                  <input v-model="shippingInfo.address" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">City</label>
                  <input v-model="shippingInfo.city" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                </div>
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
                  <input v-model="shippingInfo.postalCode" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 card-modern" data-aos="fade-up"
              data-aos-delay="100">
              <h2 class="font-serif text-2xl font-bold mb-6 flex items-center">
                <vue-feather type="credit-card" class="h-6 w-6 mr-2 text-accent"></vue-feather>
                Payment Method
              </h2>

              <div class="space-y-4">
                <div class="flex items-center">
                  <input v-model="paymentMethod" type="radio" id="credit-card" value="Credit Card" class="mr-3" />
                  <label for="credit-card" class="flex items-center">
                    <vue-feather type="credit-card" class="h-5 w-5 mr-2"></vue-feather>
                    Credit Card
                  </label>
                </div>
                <div class="flex items-center">
                  <input v-model="paymentMethod" type="radio" id="paypal" value="PayPal" class="mr-3" />
                  <label for="paypal" class="flex items-center">
                    <vue-feather type="dollar-sign" class="h-5 w-5 mr-2"></vue-feather>
                    PayPal
                  </label>
                </div>
                <div class="flex items-center">
                  <input v-model="paymentMethod" type="radio" id="cash-on-delivery" value="Cash on Delivery"
                    class="mr-3" />
                  <label for="cash-on-delivery" class="flex items-center">
                    <vue-feather type="truck" class="h-5 w-5 mr-2"></vue-feather>
                    Cash on Delivery
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <!-- Order Summary -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sticky top-6 card-modern" data-aos="fade-left">
              <h2 class="font-serif text-2xl font-bold mb-6 flex items-center">
                <vue-feather type="file-text" class="h-6 w-6 mr-2 text-accent"></vue-feather>
                Order Summary
              </h2>

              <div class="space-y-4 mb-6">
                <div v-for="item in cart" :key="item.id" class="flex justify-between">
                  <div>
                    <p class="font-medium">{{ item.name }}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                      Qty: {{ item.quantity }}
                    </p>
                  </div>
                  <p class="font-bold">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div class="flex justify-between mb-2">
                  <p class="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p>${{ cartTotal }}</p>
                </div>
                <div class="flex justify-between mb-2">
                  <p class="text-gray-600 dark:text-gray-400">Shipping</p>
                  <p class="text-green-600">Free</p>
                </div>
                <div class="flex justify-between mb-2">
                  <p class="text-gray-600 dark:text-gray-400">Taxes</p>
                  <p>$0.00</p>
                </div>
                <div class="flex justify-between font-bold text-xl mt-4">
                  <p>Total</p>
                  <p class="text-accent">${{ cartTotal }}</p>
                </div>
              </div>

              <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {{ error }}
              </div>

              <button @click="placeOrder" :disabled="isProcessing || !isFormValid"
                class="w-full bg-accent text-white py-3 px-6 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                <span v-if="isProcessing"
                  class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                <span v-else>Place Order</span>
              </button>

              <div class="mt-6 text-center">
                <router-link to="/cart" class="text-accent hover:text-accent/80 transition-colors">
                  <vue-feather type="arrow-left" class="h-4 w-4 inline mr-1"></vue-feather>
                  Return to Cart
                </router-link>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import VueFeather from "vue-feather";
import { useCartStore } from "../store/cart";
import { useOrdersStore } from "../store/orders";
import { useAuthStore } from "../store/auth";

import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";



const router = useRouter()

const { order_id, } = useOrdersStore();

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject("Failed to load Razorpay SDK");
    document.body.appendChild(script);
  });
};



const cartStore = useCartStore();
// const ordersStore = useOrdersStore();
const authStore = useAuthStore();

const { cart, cartTotal } = cartStore;
// const { createOrder, loading: orderLoading } = ordersStore;

const showLogin = ref(false);
console.log(authStore.isAuthenticated.value,authStore.user.value?.id)
const firstTimeUser = ref(!authStore.isAuthenticated.value || !authStore.user.value?.id);

const handleLoginClick = () => {
  showLogin.value = true;
};

const handleSignupClick = () => {
  showLogin.value = false;
};

const handleSuccess = () => {
  console.log("Authentication successful");
  firstTimeUser.value = false;
};


const shippingInfo = ref({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
});

const isProcessing = ref(false);
const error = ref("");

const isFormValid = computed(() => {
  return (
    shippingInfo.value.fullName &&
    shippingInfo.value.phone &&
    shippingInfo.value.address &&
    shippingInfo.value.city &&
    shippingInfo.value.postalCode &&
    paymentMethod.value
  );
});

const placeOrder = async () => {
  if (!authStore.isAuthenticated) {
    error.value = "Please log in to place an order";
    return;
  }

  if (!isFormValid.value) {
    error.value = "Please fill in all required fields";
    return;
  }

  isProcessing.value = true;
  error.value = "";

  try {
    const razorpay = new window.Razorpay({
      key: "rzp_test_RBdgGRUdVaj4hY",
      amount: cartTotal.value * 100,
      currency: "INR",
      name: "Thivana Collections",
      description: "Order Payment",
      image: "https://thivana.pages.dev/assets/logo.jpg",
      order_id: order_id,
      handler: async (response) => {
        console.log("Payment successful:", response);
        // Handle successful payment here
        //handle cloudflare payment verification and order status and detals updation
      },
      prefill: {
        name: shippingInfo.value.fullName,
        email: authStore.user.value?.email || "",
        contact: shippingInfo.value.phone,
      },
      notes: {
        address: shippingInfo.value.address,
      },
      theme: {
        color: "#F37254",
      },
    });

    razorpay.open();
  } catch (error) {
    console.error("Error initializing Razorpay:", error);
  }

  // try {
  //   const shippingAddress = `${shippingInfo.value.fullName}, ${shippingInfo.value.phone}, ${shippingInfo.value.address}, ${shippingInfo.value.city}, ${shippingInfo.value.postalCode}`;

  //   const result = await createOrder(shippingAddress, paymentMethod.value);

  //   if (result.success) {
  //     router.push(`/orders/${result.order.id}`);
  //   } else {
  //     error.value = result.error || "Failed to place order";
  //   }
  // } catch (err) {
  //   error.value = err.message || "An unexpected error occurred";
  // } finally {
  //   isProcessing.value = false;
  // }
};

onMounted(() => {
  if (!order_id) {
    router.push("/cart")
  }
  loadRazorpayScript().then(() => {
    console.log("Razorpay SDK loaded");
  }).catch((error) => {
    console.error(error);
  });
  if (authStore.isAuthenticated && authStore.user) {
    shippingInfo.value.fullName = authStore.user.user_metadata?.full_name || "";
    shippingInfo.value.phone = authStore.user.user_metadata?.phone || "";
  }
});
</script>
