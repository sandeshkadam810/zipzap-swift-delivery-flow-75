# ZipZap

**ZipZap** is a dual-interface, real-time e-commerce web application optimized for ultra-fast delivery logistics. It offers tailored experiences for both customers and store owners from a single codebase using modern frontend and backend technologies. The platform supports real-time GPS tracking, AI-powered routing, and smart inventory management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Backend Integration](#backend-integration)
- [Deployment Notes](#deployment-notes)
- [Future Improvements](#future-improvements)
- [License](#license)

## Features

### Customer Interface
- Product browsing by category
- Cart management with quantity control
- Location-based store assignment
- Real-time order tracking with map view
- Integrated coupon system and checkout flow
- Mobile-first responsive UI

### Store Interface
- Store dashboard with analytics
- Smart inventory management
- Live order queue with priority handling
- Delivery assignment to nearest available rider
- Real-time rider status monitoring

### Shared Capabilities
- Authentication and session management
- Toast notifications for success and error states
- WebSocket-based real-time data sync
- Role-based navigation and theming
- Modular codebase with full TypeScript support

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for utility-first styling
- Shadcn/ui for headless component primitives
- React Router DOM for client-side routing
- TanStack React Query for data fetching and caching

### Backend
- Supabase (PostgreSQL + Realtime + Auth)
- Row-Level Security (RLS) for access control
- WebSockets for real-time updates
- Haversine formula for geo-based logic

## Project Structure

```
zipzap-delivery-app/
├── public/                     # Static assets
├── src/
│   ├── components/             # Shared UI components
│   ├── features/               # Feature-specific modules
│   │   ├── cart/               # Cart system
│   │   ├── auth/               # Authentication modals and hooks
│   │   ├── store/              # Store-side pages and logic
│   │   └── customer/           # Customer-facing flows
│   ├── context/                # Global providers (Cart, Auth)
│   ├── layouts/                # Navigation and layout logic
│   ├── pages/                  # Page-level components
│   ├── routes/                 # App-level route structure
│   ├── data/                   # Static seed data (products, categories)
│   ├── supabase/               # Supabase client and DB types
│   └── utils/                  # Utility functions (distance, formatting)
```

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/zipzap-delivery-app.git
   cd zipzap-delivery-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable               | Description                         |
|------------------------|-------------------------------------|
| VITE_SUPABASE_URL      | Supabase project URL                |
| VITE_SUPABASE_ANON_KEY | Supabase anonymous public key       |

## Available Scripts

- `npm run dev` – Start development server with HMR
- `npm run build` – Build production assets
- `npm run preview` – Preview built app locally
- `npm run lint` – Run ESLint for code quality checks

## Backend Integration

### Supabase Features Used:
- Authentication: Role-based auth for customers and store owners
- Database: Product catalog, orders, store locations, users
- Realtime: Subscriptions for orders, riders, and status updates
- Storage: Product images and media

### Real-time Features:
- Live order placement and store assignment
- Delivery executive assignment based on location and ETA
- WebSocket updates for customer and store interfaces

### Store Assignment Logic:
- Uses Haversine formula to find nearest store within 7 km
- Auto-notifies store operators on new orders
- Order priority based on value and wait time

## Deployment Notes

- Frontend Hosting: Recommended platforms include Vercel or Netlify.
- Supabase Configuration: Enable RLS and configure tables:
  - `users`, `products`, `orders`, `stores`, `riders`, `inventory`
- Environment Security: Do not expose service_role keys on frontend.

## Future Improvements

- Admin interface for platform operators
- Payment gateway integration
- Push notifications (Web Push or Firebase)
- Order history and refunds flow
- A/B testing support for UI experiments
- PWA support for installability and offline caching

## Screenshots

### Interface Selection
![Interface Selection](./images/Screenshot%202025-06-27%20173058.png)

### Customer - Order Tracking
![Order Tracking](./images/Screenshot%202025-06-27%20173330.png)

### Customer - Shopping Cart
![Shopping Cart](./images/Screenshot%202025-06-27%20173305.png)

### Customer - Payment
![Product Listing](./images/Screenshot%202025-06-27%20173404.png)

### Customer - Homepage
![Homepage](./images/Screenshot%202025-06-27%20173135.png))

### Store - Dashboard
![Store Dashboard](./images/Screenshot%202025-06-27%20173444.png)

### Store - Live Orders
![Live Orders](./images/Screenshot%202025-06-27%20173506.png)

### Store - Delivery Monitoring
![Delivery Monitoring](./images/Screenshot%202025-06-27%20173527.png)

