# DISTRICT VINYL SHOP 

A high-contrast, brutalist e-commerce platform for vinyl enthusiasts. Built with a focus on clean typography, bold interactions, and a robust user experience.

## 🛠 Tech Stack
* **Core:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Brutalist UI)
* **Routing:** React Router DOM v6
* **Backend & Auth:** Supabase (Cloud Database, Edge Functions & Auth)
* **State & Persistence:** React State + LocalStorage (Cart)

## 🚀 Features

### 🛒 Shopping Experience
* **Cloud Inventory:** Browse a live collection of vinyl records fetched directly from a Supabase PostgreSQL database.
* **Persistent Cart:** State-managed cart system that survives page refreshes via LocalStorage.
* **Smart Checkout Gateway:** Logic-gated checkout process allowing Guest access or authenticated Supabase Member access.

### 👤 User Systems
* **Authentication:** Secure Register/Login flow powered by Supabase Auth with automatic profile creation.
* **Member Dashboard:** Real-time personal profile area displaying "Total Collection Value" and live historical purchase data from the cloud.
* **Order History:** Detailed archive of past orders including unique `DV-XXXXXX` order numbers, status tracking, and itemized lists.

### 🛠 Administrative Tools
* **Inventory Manager:** Dedicated Admin dashboard to push new products to the cloud database.
* **Product Interface:** Support for multiple images, SKUs, and detailed descriptions.
* **Cloud Storage:** Optimized image handling using external URLs (Supabase Storage ready).

## ⚡ Setup (Local Development)
* **1.:** Open terminal in my-ecommerce-shop folder.
* **2.:** Run `npm install` to install dependencies.
* **3.:** Ensure your `.env` file contains your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
* **4.:** Run `npm run dev` to start the local development server.