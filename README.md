# Thivana Collections online clothing store and e-commerce storefront

Thivana Collections is a client-side e-commerce web application for browsing and ordering trending t-shirts, dresses, and everyday apparel.

The storefront gives shoppers access to affordable clothing, printed tees, and casual fashion essentials. Customers can search the product catalog, filter clothing by category, view product image galleries, manage items in a shopping cart, and complete purchases through an integrated checkout system.

The application runs as a Vue 3 single-page application connected to a Supabase database for authentication, persistent carts, and order management.

## Architecture

The project has five primary architectural layers.

- Frontend interface. The user interface runs on Vue 3 with the Composition API and Vite 7. The styling relies on Tailwind CSS 3.4 for utility styling, with custom color tokens for background, text, and accents. UI components use PrimeVue 4 with the Aura theme preset. Animate On Scroll controls element entrance transitions on scroll.
- Client routing. Vue Router 4 manages client navigation across 12 distinct routes. These include the homepage, product catalog, individual product details view, shopping cart, checkout flow, order confirmation, authentication pages, and authenticated order history views.
- State management. Four Vue composables in the store directory manage state across sessions:
  - Auth store at src/store/auth.js tracks the Supabase user session and authentication status.
  - Cart store at src/store/cart.js manages cart state, calculates prices and item counts, saves guest items to browser local storage, and syncs cart records to Supabase when a user signs in.
  - Orders store at src/store/orders.js queries historical orders from Supabase and extracts shipping data for checkout forms.
  - Products store at src/store/products.js loads product definitions from products.json and provides category filtering and item lookups.
- Backend database. Supabase provides PostgreSQL storage and user authentication. The database schema in supabase-schema.sql configures tables for cart, orders, and order_items, with Row Level Security policies, foreign key cascades, and automated triggers that generate order identifiers.
- Payment integration. The checkout view connects to Cloudflare Workers endpoints at https://api.media-thivana.workers.dev/orders and /placeOrder to initialize transactions with the Razorpay payment gateway and record order payments.

## Setup

The project requires Node.js version 20.19.0 or version 22.12.0 and above.

1. Clone the repository:
```sh
git clone https://github.com/devsanthoshmk/thivanacollections.git
cd thivanacollections
```

2. Install dependencies:
```sh
npm install
```

3. Set up database tables:
Execute the queries in supabase-schema.sql in the Supabase SQL Editor to create the required tables, triggers, and Row Level Security policies.

## Usage

Start the local development server:
```sh
npm run dev
```

Build minified production assets:
```sh
npm run build
```

Preview the production build locally:
```sh
npm run preview
```

## Configuration

- Vite configuration in vite.config.js configures @vitejs/plugin-vue, vite-plugin-vue-devtools, and path aliases mapping @ to ./src.
- Tailwind configuration in tailwind.config.js configures class-based dark mode, template content paths, and color themes.
- Supabase credentials in src/supabase.js initializes the Supabase client using project URL and anon public key.
- PrimeVue setup in src/main.js configures the Aura theme preset, dark mode selector, ripple animations, and toast notifications.
