# DISTRICT VINYL SHOP 

A high-contrast, brutalist e-commerce platform for vinyl enthusiasts. Built with a focus on clean typography, bold interactions, and a robust user experience.

## 🛠 Tech Stack
* **Core:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Brutalist UI)
* **Routing:** React Router DOM v6
* **State & Persistence:** LocalStorage API (Current) / Supabase (Migration Planned)

## 🚀 Features

### 🛒 Shopping Experience
* **Dynamic Inventory:** Browse a curated collection of vinyl records with high-quality imagery.
* **Persistent Cart:** State-managed cart system that survives page refreshes.
* **Smart Checkout Gateway:** Logic-gated checkout process allowing Guest access or Member authentication.

### 👤 User Systems
* **Authentication:** Full Register/Login flow with manual and auto-fill shipping logic.
* **Member Dashboard:** Personal profile area displaying "Total Collection Value" and historical purchase data.
* **Order History:** Detailed archive of past orders including dates, unique IDs, and itemized lists.

### 🛠 Administrative Tools
* **Inventory Manager:** Dedicated Admin dashboard to add new Vinyls (records) or Vinyl Gear, set pricing, and manage stock.
* **Product Interface:** Support for multiple images, SKUs, and detailed descriptions.

## 🔜 Roadmap
When we switch to Supabase, we are going to:
* **Users Table:** Move from the `district_users` array to a Supabase Auth + `profiles` table.
* **Products Table:** Move from `district_products` to a `products` table in the cloud.
* **Storage:** Instead of long Base64 strings or local URLs, your images will be stored in **Supabase Storage Buckets**, and the database will just save the link.

## ⚡ Setup (Local Development)
* **1.:** Open terminal in my-ecommerce-shop folder.
* **2.:** Run `npm install` to install dependencies.
* **3.:** Run `npm run dev` to start the local development server.