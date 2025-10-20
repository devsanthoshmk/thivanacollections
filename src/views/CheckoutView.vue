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
                <!-- Full Name -->
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input v-model="shippingInfo.fullName" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                  <p v-if="shippingErrors.fullName" class="text-red-500 text-sm mt-1">{{ shippingErrors.fullName }}</p>
                </div>
                <!-- Phone Number -->
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input v-model="shippingInfo.phone" type="tel"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                  <p v-if="shippingErrors.phone" class="text-red-500 text-sm mt-1">{{ shippingErrors.phone }}</p>
                </div>
                <!-- Address -->
                <div class="md:col-span-2">
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Address</label>
                  <input v-model="shippingInfo.address" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                  <p v-if="shippingErrors.address" class="text-red-500 text-sm mt-1">{{ shippingErrors.address }}</p>
                </div>
                <!-- City -->
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">City</label>
                  <input v-model="shippingInfo.city" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                  <p v-if="shippingErrors.city" class="text-red-500 text-sm mt-1">{{ shippingErrors.city }}</p>
                </div>
                <!-- Postal Code -->
                <div>
                  <label class="block text-gray-700 dark:text-gray-300 mb-2">Postal Code</label>
                  <input v-model="shippingInfo.postalCode" type="text"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-700" />
                  <p v-if="shippingErrors.postalCode" class="text-red-500 text-sm mt-1">{{ shippingErrors.postalCode }}</p>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <!-- <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 card-modern" data-aos="fade-up"
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
            </div> -->
          </div>

          <div>
            <!-- Order Summary -->
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sticky top-6 card-modern" data-aos="fade-left">
              <h2 class="font-serif text-2xl font-bold mb-6 flex items-center">
                <vue-feather type="file-text" class="h-6 w-6 mr-2 text-accent"></vue-feather>
                Order Summary
              </h2>
              <div v-if="actualOrdersItm===undefined || actualOrdersItm.length === 0" class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>

              <div v-else class="space-y-4 mb-6">
                <div v-for="item in actualOrdersItm" :key="item.id" class="flex justify-between">
                  <div>
                    <p class="font-medium">{{ item.name }}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                      Qty: {{ item.quantity }}
                    </p>
                  </div>
                  <p class="font-bold">
                    ₹{{ (item.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                <div class="flex justify-between mb-2">
                  <p class="text-gray-600 dark:text-gray-400">Subtotal</p>
                  <p>₹{{ totalAmount }}</p>
                </div>
                <div class="flex justify-between mb-2">
                  <p class="text-gray-600 dark:text-gray-400">Shipping</p>
                  <p class="text-green-600">Free</p>
                </div>
                <div class="flex justify-between mb-2">
                  <p class="text-gray-600 dark:text-gray-400">Taxes</p>
                  <p>₹0.00</p>
                </div>
                <div class="flex justify-between font-bold text-xl mt-4">
                  <p>Total</p>
                  <p class="text-accent">₹{{ totalAmount }}</p>
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
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import { useRoute, useRouter } from 'vue-router'
import Button from "primevue/button";
import VueFeather from "vue-feather";
import { useCartStore } from "../store/cart";
import { useOrdersStore } from "../store/orders";
import { useAuthStore } from "../store/auth";
import { useToast } from "primevue/usetoast";
import AutoComplete from 'primevue/autocomplete';


import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";



const toast = useToast();
const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const authStore = useAuthStore();

const { cart, actualCart } = cartStore;
const {orders, userPrevData, getOrderBynum, loading,loadOrders } = useOrdersStore();

let actualOrder = {};
const actualOrdersItm = ref([]);
const totalAmount = computed(() =>
  actualOrdersItm.value.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
)
watchEffect(() => {
  console.log("actualOrdersItm: ", actualOrdersItm.value,actualCart.value)
});
const order_number = route.params.order_number;
console.log("order_number from params: ", order_number);

if (order_number===undefined || !order_number.startsWith("ORD")) {
  console.error("Invalid order number format:", order_number);
  toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid order number format.', life: 4000 });
  router.push("/cart");  
}
console.error(loading.value);



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

loadRazorpayScript().then(() => {
  console.log("Razorpay SDK loaded");
}).catch((error) => {
  console.error(error);
});



const showLogin = ref(false);
console.log(authStore.isAuthenticated.value, authStore.user.value?.id)
const firstTimeUser = computed(() => !authStore.isAuthenticated.value || !authStore.user.value?.id);

const handleLoginClick = () => {
  showLogin.value = true;
};

const handleSignupClick = () => {
  showLogin.value = false;
};

const handleSuccess = () => {
  console.log("Authentication successful");
};


const shippingInfo = ref({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
});

const shippingErrors = ref({
  fullName: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
});

const isProcessing = ref(false);
const error = ref("");

const isFormValid = computed(() => {
  const name = shippingInfo.value.fullName?.trim();
  const phone = shippingInfo.value.phone?.trim();
  const address = shippingInfo.value.address?.trim();
  const city = shippingInfo.value.city?.trim();
  const postal = shippingInfo.value.postalCode?.trim();

  const phoneValid = /^\d{10,}$/.test(phone);
  const postalValid = /^[A-Za-z0-9]{4,10}$/.test(postal);

  return (
    name && name.length >= 2 &&
    phone && phoneValid &&
    address && address.length >= 5 &&
    city && city.length >= 2 &&
    postal && postalValid
  );
});

function validateShipping() {
  // Full Name
  if (!shippingInfo.value.fullName.trim()) {
    shippingErrors.value.fullName = "Full name is required.";
  } else if (shippingInfo.value.fullName.trim().length < 2) {
    shippingErrors.value.fullName = "Full name must be at least 2 characters.";
  } else {
    shippingErrors.value.fullName = "";
  }

  // Phone
  const phone = shippingInfo.value.phone.trim();
  if (!phone) {
    shippingErrors.value.phone = "Phone number is required.";
  } else if (!/^\d{10,}$/.test(phone)) {
    shippingErrors.value.phone = "Enter a valid 10-digit phone number.";
  } else {
    shippingErrors.value.phone = "";
  }

  // Address
  if (!shippingInfo.value.address.trim()) {
    shippingErrors.value.address = "Address is required.";
  } else if (shippingInfo.value.address.trim().length < 5) {
    shippingErrors.value.address = "Address must be at least 5 characters.";
  } else {
    shippingErrors.value.address = "";
  }

  // City
  if (!shippingInfo.value.city.trim()) {
    shippingErrors.value.city = "City is required.";
  } else if (shippingInfo.value.city.trim().length < 2) {
    shippingErrors.value.city = "City must be at least 2 characters.";
  } else {
    shippingErrors.value.city = "";
  }

  // Postal Code
  const postal = shippingInfo.value.postalCode.trim();
  if (!postal) {
    shippingErrors.value.postalCode = "Postal code is required.";
  } else if (!/^[A-Za-z0-9]{4,10}$/.test(postal)) {
    shippingErrors.value.postalCode = "Enter a valid postal code (4-10 characters).";
  } else {
    shippingErrors.value.postalCode = "";
  }
}

const placeOrder = async () => {

  toast.add({severity:'info', summary: 'Processing', detail:'Processing your order...', life: 3000});
  
  //this part is for getting order id from backend and passing it to razorpay payment gateway
  let razorData;
  try {
    // calling cloudflare workers backend api to get order_id from razorpay

    const data = {
      razorBody: {
        amount: totalAmount.value * 100,
        currency: "INR",
      },
    }
    const response = await fetch('https://api.media-thivana.workers.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      mode: 'cors'
    })

    if (!response.ok) throw new Error('Failed to create order')

    const { payment_data,error } = await response.json() // if error error nothing else is deprecated
    console.log("payment_data:", payment_data)
    razorData = payment_data;
    // if(error) throw new Error(error.message)
    if (error) console.log(error);

  } catch (error) {
    console.error('Error adding orders:', error)
  }

  //this below part is for razorpay payment gateway integration 
  if (!authStore.isAuthenticated) {
    error.value = "Please log in to place an order";
    return;
  }

  validateShipping();

  if (!isFormValid.value) {
    error.value = "Please fill in all required fields";
    return;
  }
  console.error("razorData.id",razorData.id)

  isProcessing.value = true;
  error.value = "";
  let payload = {};
  try {
    console.warn("actualOrder before payment:", actualOrder);
    payload = {
      key: "rzp_test_RBdgGRUdVaj4hY",
      amount: totalAmount.value * 10000, // Amount in paise
      currency: "INR",
      name: "Thivana Collections",
      description: "Order Payment",
      image: "https://thivana.pages.dev/assets/logo.jpg",
      order_id: razorData.id,
      handler: async (response) => {
        console.log("Payment successful?:", response);
        await updateOrderStatus(
          response,
          {
            id: actualOrder.id,
            name: shippingInfo.value.fullName,
            phone: shippingInfo.value.phone,
            email: authStore.user.value?.email,
            address: shippingInfo.value.address + "$$" + shippingInfo.value.city,
            postalCode: shippingInfo.value.postalCode,
            order_id: razorData.order_id,
          }
        );
        // Handle successful payment here
        //handle cloudflare payment verification and order status and detals updation
        await loadOrders();
        const finorder = orders.value.find(o => o.id === actualOrder.id);

        if (finorder && finorder.status === "paid") {
              toast.add({severity:'success', summary: 'Order Placed', detail:'Your order has been placed successfully!', life: 6000});
              router.push("/orders/"+actualOrder.order_number)
        }
      },
      prefill: {
        name: shippingInfo.value.fullName,
        email: authStore.user.value?.email,
        contact: shippingInfo.value.phone,
      },
      notes: {
        address: shippingInfo.value.address,
      },
      theme: {
        color: "#F37254",
      },
    }
    console.warn("payload for razorpay:", JSON.stringify(payload));
    const razorpay = new window.Razorpay(payload);

    razorpay.open();
  } catch (error) {
    console.error("Error initializing Razorpay:", error);
  }


};

const updateOrderStatus = async (payment,user_data) => {
  try {
    const data = await fetch(`api.media-thivana.workers.dev/placeOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        payment: payment,
        user_data: user_data,
       }),
    });
    console.log("Order status updated to:", data);
  } catch (err) {
    console.error("Failed to update order status:", err);
  }
};

onMounted(() => {
  if (authStore.isAuthenticated && authStore.user) {
    shippingInfo.value.fullName = authStore.user.user_metadata?.full_name || "";
    shippingInfo.value.phone = authStore.user.user_metadata?.phone || "";
  }

  console.log("orders from checkout.vue: ", orders.value, route.params.order_number)
  console.log("from checkout onmount",!authStore.isAuthenticated.value || !authStore.user.value?.id,authStore,authStore.isAuthenticated.value)
  console.log(authStore.isAuthenticated.value)
  console.log(actualOrdersItm.value,actualOrdersItm.value.name)

  const watchLoading = watch(loading, () => {
    console.error("loading changed:", loading.value);
    try {
      if (!loading.value) {
        if (order_number) {
          const order = getOrderBynum(order_number);
          if (order) {
            actualOrder = order;
            shippingInfo.value.fullName = actualOrder.name || "";
            shippingInfo.value.phone = actualOrder.phone || "";
            console.warn("actualOrder after fetch:", actualOrder.address, actualOrder.postal_code,actualOrder);
            shippingInfo.value.address = actualOrder.address?.split("$$")[0] || "";
            shippingInfo.value.city = actualOrder.address?.split("$$")[1] || "";
            shippingInfo.value.postalCode = actualOrder.postal_code || "";
            actualOrdersItm.value = (order.order_items || []).map(item => ({
              id: item.id,
              name: item.product_name,
              quantity: item.quantity,
              price: item.product_price
            }));
            console.log("Fetched order for checkout:", order);
          } else {
            console.error("No order found with number:", order_number);
            toast.add({ severity: 'error', summary: 'Error', detail: 'No order found with the provided order number.', life: 4000 });
            router.push("/orders");
          }
        } else {
          console.log("No order number provided in route params.");
        }
        setTimeout(() => {
          watchLoading(); // Stop watching after initial load
        }, 1000);
      }
    } catch (error) {
        console.error("Error fetching order:", error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load order details.', life: 4000 });
        router.push("/orders");
      }
  },
      { immediate: true } // ✅ run once right away
    );
});

watch(shippingInfo, validateShipping, { deep: true, immediate: true });

watch(firstTimeUser, () => {
  console.error("from watch",!authStore.isAuthenticated.value || !authStore.user.value?.id,authStore,authStore.isAuthenticated.value)
})
</script>
