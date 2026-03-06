# Product Cart React App

A production-style React + TypeScript shopping cart application with product listing, cart management, feature flags, and automated tests.

## Objective

Build a clean, interview-ready frontend application that demonstrates:

- API integration with async loading and error handling
- product search, category filtering, and price sorting
- state management using Context + reducer
- persistent cart state with localStorage
- route-based UI with React Router
- unit and component test coverage

## Features

- Product catalog page (`/products`)
- Search products by title
- Filter products by category
- Sort products by price (low to high / high to low)
- Grid and list view toggle
- Add products to cart
- Cart page (`/cart`) with:
  - quantity update
  - remove item
  - subtotal and total calculation
- Cart badge in header (live item count)
- Discount feature flag using query params and localStorage
- Loading, error, and empty-state handling

## How It Works

1. `ProductList` fetches products and categories from Fake Store API.
2. `filterAndSortProducts` applies search/filter/sort logic in a pure utility.
3. `CartContext` uses `useReducer` with `cartReducer` for all cart actions.
4. Cart state is persisted to localStorage key: `product-cart-items`.
5. `Header` reads cart summary and shows live badge count.
6. `CartPage` computes subtotal and optional discount total.
7. `useFeatureFlag` reads `?ff=discount` and persists the flag in localStorage.

## Routes

- `/` -> redirects to `/products`
- `/products` -> product catalog
- `/cart` -> shopping cart
- `*` -> redirects to `/products`

## Feature Flag

Enable 10% cart discount by visiting:

`/cart?ff=discount`

Behavior:

- When query param is present, the flag is stored in localStorage (`enableDiscount`).
- On next visits, stored flag is reused even without query param.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- Axios
- Jest + React Testing Library

## Project Structure

```txt
src/
  api/                  # API layer (products, categories)
  components/
    layout/             # Header
    ui/                 # Button, Badge
  context/              # Cart context provider and hooks
  features/
    products/           # Product list, product card, utilities, tests
    cart/               # Cart page, reducer, reducer tests
  hooks/                # Feature flag hook
  test/                 # Test setup
  types/                # Product type model
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open: `http://localhost:5173`

## Test and Quality

### Run tests

```bash
npm run test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Lint

```bash
npm run lint
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## API Source

- `GET https://fakestoreapi.com/products`
- `GET https://fakestoreapi.com/products/categories`

## Test Coverage Highlights

- `cart-reducer.test.ts`
  - add, remove, update quantity
  - count and subtotal helpers
- `ProductList.test.tsx`
  - mocked API flow
  - add-to-cart behavior
  - header badge update

## Contact

Faysal Ahmed  
Email: faysalahmediiuc@gmail.com  
Phone: +8801675526215
