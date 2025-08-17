<template>
  <div class="bg-primary dark:bg-secondary min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[500px] text-white overflow-hidden" style="background-image: url('/images/collection-banner.jpg')">
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      <div class="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 class="font-serif text-5xl md:text-6xl font-bold mb-6" data-aos="fade-up">Our Story</h1>
        <div class="divider mb-6" data-aos="fade-up" data-aos-delay="100">
          <span>Thivana Collections</span>
        </div>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">Crafting elegance since 2010, our journey has been defined by passion, precision, and an unwavering commitment to excellence.</p>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <h2 class="font-serif text-4xl font-bold text-secondary dark:text-primary mb-6">Our Heritage</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">Thivana Collections was born from a vision to create jewelry that transcends time. Founded in 2010 by master jeweler Thivana Rajan, our brand has grown from a small boutique to a globally recognized name in luxury jewelry.</p>
            <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">Each piece in our collection tells a story of craftsmanship, innovation, and the relentless pursuit of perfection. We believe that jewelry is not merely an accessory, but a reflection of one's personality and a celebration of life's most precious moments.</p>
            <div class="flex items-center mt-8">
              <div class="mr-6">
                <div class="text-4xl font-bold text-accent mb-2">13+</div>
                <div class="text-gray-600 dark:text-gray-400">Years of Excellence</div>
              </div>
              <div class="mr-6">
                <div class="text-4xl font-bold text-accent mb-2">5000+</div>
                <div class="text-gray-600 dark:text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div class="text-4xl font-bold text-accent mb-2">25+</div>
                <div class="text-gray-600 dark:text-gray-400">Countries</div>
              </div>
            </div>
          </div>
          <div class="img-hover-zoom rounded-xl overflow-hidden shadow-xl" data-aos="fade-left">
            <img src="/images/pic_1.1.jpeg" alt="Our Heritage" class="w-full h-auto">
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-gradient-to-b from-primary to-gray-50 dark:from-secondary dark:to-gray-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Our Values</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">The principles that guide every piece we create</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center card-modern" data-aos="fade-up" data-aos-delay="200">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <vue-feather type="award" class="h-8 w-8 text-accent"></vue-feather>
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4">Excellence</h3>
            <p class="text-gray-600 dark:text-gray-400">We never compromise on quality. Every piece is meticulously crafted to meet the highest standards of excellence.</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center card-modern" data-aos="fade-up" data-aos-delay="300">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <vue-feather type="heart" class="h-8 w-8 text-accent"></vue-feather>
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4">Passion</h3>
            <p class="text-gray-600 dark:text-gray-400">Our love for jewelry drives us to create pieces that evoke emotion and celebrate life's special moments.</p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center card-modern" data-aos="fade-up" data-aos-delay="400">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <vue-feather type="users" class="h-8 w-8 text-accent"></vue-feather>
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-4">Integrity</h3>
            <p class="text-gray-600 dark:text-gray-400">We believe in ethical sourcing, transparent practices, and building lasting relationships with our clients.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Meet Our Artisans</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">The talented individuals behind our exquisite creations</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center" data-aos="fade-up" data-aos-delay="200">
            <div class="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 img-hover-zoom">
              <img src="/images/pic_1.2.jpeg" alt="Thivana Rajan" class="w-full h-full object-cover">
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">Thivana Rajan</h3>
            <p class="text-accent font-semibold mb-4">Founder & Master Jeweler</p>
            <p class="text-gray-600 dark:text-gray-400">With over 20 years of experience, Thivana's vision and expertise are the cornerstone of our brand.</p>
          </div>
          
          <div class="text-center" data-aos="fade-up" data-aos-delay="300">
            <div class="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 img-hover-zoom">
              <img src="/images/pic_1.3.jpeg" alt="Ananya Sharma" class="w-full h-full object-cover">
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">Ananya Sharma</h3>
            <p class="text-accent font-semibold mb-4">Head Designer</p>
            <p class="text-gray-600 dark:text-gray-400">Ananya brings contemporary flair to traditional designs, creating pieces that are both timeless and modern.</p>
          </div>
          
          <div class="text-center" data-aos="fade-up" data-aos-delay="400">
            <div class="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 img-hover-zoom">
              <img src="/images/pic_1.4.jpeg" alt="Rajiv Menon" class="w-full h-full object-cover">
            </div>
            <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">Rajiv Menon</h3>
            <p class="text-accent font-semibold mb-4">Master Craftsman</p>
            <p class="text-gray-600 dark:text-gray-400">Rajiv's meticulous attention to detail ensures that every piece meets our exacting standards of quality.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20 bg-gradient-to-b from-primary to-gray-50 dark:from-secondary dark:to-gray-900">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="font-serif text-4xl md:text-5xl font-bold text-secondary dark:text-primary mb-4" data-aos="fade-up">Our Journey</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Milestones that have shaped our story</p>
        </div>
        
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent/30"></div>
          
          <!-- Timeline items -->
          <div class="space-y-16">
            <div class="flex items-center" data-aos="fade-right">
              <div class="w-1/2 pr-8 text-right">
                <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">2010</h3>
                <p class="text-gray-600 dark:text-gray-400">Thivana Collections was founded with a small boutique in Mumbai.</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-accent border-4 border-white dark:border-gray-900 z-10"></div>
              <div class="w-1/2 pl-8"></div>
            </div>
            
            <div class="flex items-center" data-aos="fade-left">
              <div class="w-1/2 pr-8"></div>
              <div class="w-8 h-8 rounded-full bg-accent border-4 border-white dark:border-gray-900 z-10"></div>
              <div class="w-1/2 pl-8">
                <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">2015</h3>
                <p class="text-gray-600 dark:text-gray-400">Expanded internationally with our first store in Singapore.</p>
              </div>
            </div>
            
            <div class="flex items-center" data-aos="fade-right">
              <div class="w-1/2 pr-8 text-right">
                <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">2018</h3>
                <p class="text-gray-600 dark:text-gray-400">Launched our e-commerce platform, reaching customers worldwide.</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-accent border-4 border-white dark:border-gray-900 z-10"></div>
              <div class="w-1/2 pl-8"></div>
            </div>
            
            <div class="flex items-center" data-aos="fade-left">
              <div class="w-1/2 pr-8"></div>
              <div class="w-8 h-8 rounded-full bg-accent border-4 border-white dark:border-gray-900 z-10"></div>
              <div class="w-1/2 pl-8">
                <h3 class="font-serif text-2xl font-bold text-secondary dark:text-primary mb-2">2023</h3>
                <p class="text-gray-600 dark:text-gray-400">Celebrated our 5000th customer and expanded to 25 countries.</p>
              </div>
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