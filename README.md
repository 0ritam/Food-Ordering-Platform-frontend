# Food Ordering Platform - Frontend

A React + TypeScript frontend for ordering food with cart management and order tracking.

## What's Inside

- Authentication (login/register)
- Browse food items by category
- Shopping cart with checkout
- Order history
- Mobile responsive design

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- React Router (navigation)
- Tailwind CSS (styling)
- Axios (API calls)
- react-hot-toast (notifications)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Backend API running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
cd client
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:8080/api
```

3. Start dev server:
```bash
npm run dev
```

App runs on `http://localhost:5173`

## Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   └── NavBar.tsx       # Navigation with mobile menu
│   ├── pages/
│   │   ├── HomePage.tsx     # Landing + item list
│   │   ├── LoginPage.tsx    # Login form
│   │   ├── RegisterPage.tsx # Register form
│   │   ├── CartPage.tsx     # Cart & checkout
│   │   └── OrderHistoryPage.tsx # Past orders
│   ├── context/
│   │   └── AuthContext.tsx  # Auth state management
│   ├── App.tsx              # Routes
│   ├── main.tsx             # Entry point
│   └── index.css            # Tailwind styles
└── package.json
```

## Features

### Authentication
- JWT token stored in localStorage
- Protected routes redirect to login
- Auto-logout on token expiration

### Cart Management
- Add items with quantity
- View cart total
- Checkout creates order

### Responsive Design
- Mobile: Hamburger menu, stacked layout
- Desktop: Full navigation, grid layout
- Breakpoints: sm (640px), md (768px), lg (1024px)

### Landing Page
- Split-screen design
- Left: App info with features
- Right: Login/Register buttons
- Shows item grid when logged in

## Custom Colors

```css
--primary-dark: #AD4728
--orange: #FD9139
--orange-light: #FCA65E
```

## API Integration

All API calls go through axios with base URL from `.env`:

```typescript
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
```

Auth token automatically added to requests via AuthContext.

## Building for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

Set environment variable in Vercel:
- `VITE_API_URL` = your production API URL

## Common Issues

**API calls fail?**
- Check backend is running on port 8080
- Verify `VITE_API_URL` in `.env`

**Toast notifications not showing?**
- Check react-hot-toast is installed
- Toaster component is in `main.tsx`

**Styles not applying?**
- Run `npm install` to ensure Tailwind is installed
- Check `tailwind.config.js` exists

**Build errors?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

