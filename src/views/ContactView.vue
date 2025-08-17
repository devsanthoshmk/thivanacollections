<template>
  <div class="bg-primary dark:bg-secondary min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[500px] text-white overflow-hidden" style="background-image: url('/images/banner-image-3.jpg')">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 class="font-serif text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">Contact Us</h1>
        <div class="divider mb-6" data-aos="fade-up" data-aos-delay="100">
          <span>Get in Touch</span>
        </div>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">We'd love to hear from you. Reach out to us and let's start a conversation.</p>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center card-modern" data-aos="fade-up" data-aos-delay="100">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <vue-feather type="map-pin" class="h-8 w-8 text-accent"></vue-feather>
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4">Visit Us</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">123 Jewelry Avenue</p>
            <p class="text-gray-600 dark:text-gray-400 mb-2">Mumbai, Maharashtra 400001</p>
            <p class="text-gray-600 dark:text-gray-400">India</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center card-modern" data-aos="fade-up" data-aos-delay="200">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <vue-feather type="phone" class="h-8 w-8 text-accent"></vue-feather>
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4">Call Us</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">+91 22 1234 5678</p>
            <p class="text-gray-600 dark:text-gray-400">Mon-Sat: 10am - 8pm</p>
            <p class="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center card-modern" data-aos="fade-up" data-aos-delay="300">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <vue-feather type="mail" class="h-8 w-8 text-accent"></vue-feather>
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4">Email Us</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">info@thivanacollections.com</p>
            <p class="text-gray-600 dark:text-gray-400 mb-2">support@thivanacollections.com</p>
            <p class="text-gray-600 dark:text-gray-400">We respond within 24 hours</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 class="font-serif text-4xl font-bold text-secondary dark:text-primary mb-6">Send Us a Message</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-8">Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Your Name</label>
                <input type="text" id="name" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-800">
              </div>
              
              <div>
                <label for="email" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Email Address</label>
                <input type="email" id="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-800">
              </div>
              
              <div>
                <label for="subject" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Subject</label>
                <input type="text" id="subject" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-800">
              </div>
              
              <div>
                <label for="message" class="block text-gray-700 dark:text-gray-300 font-medium mb-2">Message</label>
                <textarea id="message" rows="5" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent bg-white dark:bg-gray-800"></textarea>
              </div>
              
              <button type="submit" class="btn-modern bg-accent text-white py-3 px-8 rounded-full font-bold hover:bg-opacity-90 transition-all duration-300">Send Message</button>
            </form>
          </div>
          
          <div class="img-hover-zoom rounded-xl overflow-hidden shadow-xl" data-aos="fade-left">
            <img src="/images/banner-image-4.jpg" alt="Contact Us" class="w-full h-auto">
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="py-20 bg-gradient-to-b from-primary to-gray-50 dark:from-secondary dark:to-gray-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Find Us</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Visit our flagship store in the heart of Mumbai</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
          <div class="h-96 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <div class="text-center">
              <vue-feather type="map" class="h-16 w-16 text-gray-500 dark:text-gray-400 mx-auto mb-4"></vue-feather>
              <p class="text-gray-500 dark:text-gray-400">Interactive Map</p>
              <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">123 Jewelry Avenue, Mumbai, Maharashtra 400001</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Frequently Asked Questions</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Find answers to common questions about our products and services</p>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="200">
            <div class="p-6 cursor-pointer flex justify-between items-center">
              <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary">Do you offer international shipping?</h3>
              <vue-feather type="chevron-down" class="h-5 w-5 text-accent"></vue-feather>
            </div>
            <div class="px-6 pb-6 text-gray-600 dark:text-gray-400">
              Yes, we ship to over 25 countries worldwide. Shipping costs and delivery times vary depending on the destination.
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="300">
            <div class="p-6 cursor-pointer flex justify-between items-center">
              <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary">What is your return policy?</h3>
              <vue-feather type="chevron-down" class="h-5 w-5 text-accent"></vue-feather>
            </div>
            <div class="px-6 pb-6 text-gray-600 dark:text-gray-400">
              We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="400">
            <div class="p-6 cursor-pointer flex justify-between items-center">
              <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary">Do you offer jewelry customization?</h3>
              <vue-feather type="chevron-down" class="h-5 w-5 text-accent"></vue-feather>
            </div>
            <div class="px-6 pb-6 text-gray-600 dark:text-gray-400">
              Yes, we offer customization services for many of our pieces. Please contact us with your specific requirements and our design team will be happy to assist you.
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="500">
            <div class="p-6 cursor-pointer flex justify-between items-center">
              <h3 class="font-serif text-xl font-bold text-secondary dark:text-primary">How do I care for my jewelry?</h3>
              <vue-feather type="chevron-down" class="h-5 w-5 text-accent"></vue-feather>
            </div>
            <div class="px-6 pb-6 text-gray-600 dark:text-gray-400">
              Each piece comes with specific care instructions. In general, we recommend storing jewelry in a dry place, avoiding contact with chemicals, and cleaning gently with a soft cloth.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import VueFeather from 'vue-feather';
</script>