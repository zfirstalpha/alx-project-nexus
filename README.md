# ProDev Frontend Engineering Program

## Overview

The **ProDev Frontend Engineering** program is an intensive and comprehensive training designed to equip developers with advanced skills in frontend development. It covers modern web technologies, best practices, and industry standards to build scalable, high-performance applications.

# Addis Store - Next.js Ecommerce Project

[Live Demo](https://alx-project-nexus-green.vercel.app/)  

Addis Store is a modern, fully responsive eCommerce web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to browse products, view product details, add items to the cart, and subscribe to a newsletter. The project showcases modern frontend practices, dynamic routing, and clean UI design.

---

## Features

- 🏠 **Homepage** with hero section, featured products, and call-to-action  
- 📦 **Product Listing** with individual product pages and dynamic routes  
- 🛒 **Shopping Cart** functionality for adding/removing items  
- ✉️ **Newsletter Subscription**  
- 📞 **Contact and About Pages**  
- 📱 Fully **responsive design** for mobile, tablet, and desktop  
- 🖼️ **Optimized Images** using Next.js `<Image>` component  
- 🌐 SEO-friendly URLs and clean routing  
- ⚡ Smooth animations and sliders for product showcases  

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS  
- **Backend (Optional):** MongoDB + Mongoose  
- **Image Hosting:** Cloudinary  
- **Icons & UI:** React Icons, Swiper.js  
- **Deployment:** Vercel (frontend) 

---

## Project Structure
```bash
components
├── Cart
│   ├── Cart.tsx
│   └── CartIconNav.tsx
├── Footer
│   └── index.tsx
├── LandingPage
│   ├── BestSelling.tsx
│   ├── FeaturedProduct.tsx
│   ├── GallerySlider.tsx
│   ├── HeroVideo.tsx
│   ├── NewsletterComponent....
│   ├── WatchOfTheMonth.tsx
│   └── WatchReviewSlider.tsx
├── Navbar
│   └── index.tsx
├── product (directory not fully expanded/visible)
└── products
    ├── ProductCard.tsx
    └── ProductGrid.tsx
├── contexts
│   └── CartContext.tsx
├── interfaces
│   └── index.ts
├── lib (directory not expanded)
├── node_modules (directory not expanded)
└── pages
    ├── about
    │   └── index.tsx
    ├── api
    │   └── hello.ts
    ├── checkout
    │   └── index.tsx
    ├── contact
    │   └── index.tsx
    ├── product
    │   └── [productId].tsx
    ├── _app.tsx
    ├── _document.tsx
    ├── index.tsx
    ├── Layout.tsx
    └── products.tsx
```
---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/zfirstalpha/alx-project-nexus.git
cd alx-project-nexus
