# PCStore

PCStore is a modern computer accessories e-commerce website built with Next.js, React, TypeScript, Tailwind CSS, Prisma, and SQLite.

The project includes user authentication, product browsing, a shopping cart, and a protected admin panel for managing products and users.

## Features

### User

- User registration
- User login and logout
- Password hashing with bcrypt
- Authentication using HTTP-only cookies
- Product listing
- Shopping cart
- Add products to cart
- Increase and decrease product quantity
- Remove products from cart
- Automatic total price calculation
- Responsive design
- Light and dark mode

### Admin

- Protected admin dashboard
- Admin authentication
- Dashboard statistics
- Product management
- Add products
- Edit products
- Delete products
- User management
- View registered users
- Delete users
- Protection against deleting the admin account

## Project Structure

```text
PCStore/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   └── products/
│       ├── mouse.jpg
│       ├── keyboard.jpg
│       ├── headset.jpg
│       ├── monitor.jpg
│       ├── controller.jpg
│       └── microphone.jpg
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── ProductManagement.tsx
│   │   │   └── UserManagement.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── products/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── users/
│   │   │   │   │   └── route.ts
│   │   │   │   └── stats/
│   │   │   │       └── route.ts
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   ├── me/
│   │   │   │   └── register/
│   │   │   │
│   │   │   ├── cart/
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   └── products/
│   │   │       └── route.ts
│   │   │
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   │
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero3D.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductCarousel.tsx
│   │   └── ThemeProvider.tsx
│   │
│   └── lib/
│       ├── prisma.ts
│       └── admin.ts
│
├── .gitignore
├── prisma.config.ts
├── package.json
└── README.md
```
---

## Database

PCStore uses Prisma ORM with SQLite.

The database contains three main models:

### User

Stores registered users.

```text
id
name
email
password
createdAt
```

### Product

Stores products available in the store.

```text
id
name
description
category
price
image
createdAt
```

### CartItem

Connects users with products in their shopping carts.

```text
id
quantity
userId
productId
```

A unique constraint is used for `userId` and `productId` so that a user cannot have multiple separate cart records for the same product.

---

## Authentication

PCStore uses a simple cookie-based authentication system.

When a user logs in:

1. The email is searched in the database.
2. The entered password is compared with the stored bcrypt hash.
3. A `userId` HTTP-only cookie is created.
4. The cookie is used to identify the authenticated user.

The authenticated user can then access features such as the shopping cart.

---

## Admin Panel

The admin panel is available at:

```text
/admin
```

The admin area is protected and can only be accessed by the configured administrator account.

The admin dashboard provides:

* Product statistics
* User statistics
* Cart item statistics
* Product management
* User management

### Admin Features

Administrators can:

* Add products
* Edit products
* Delete products
* View registered users
* Delete users
* View dashboard statistics

The application also prevents the administrator account from being deleted through the admin panel.

---

## API Routes

### Authentication

```text
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
POST /api/auth/logout
```

### Products

```text
GET /api/products
```

### Cart

```text
GET    /api/cart
POST   /api/cart
PATCH  /api/cart
DELETE /api/cart
```

### Admin Statistics

```text
GET /api/admin/stats
```

### Admin Products

```text
GET    /api/admin/products
POST   /api/admin/products
PATCH  /api/admin/products
DELETE /api/admin/products
```

### Admin Users

```text
GET    /api/admin/users
DELETE /api/admin/users
```

---

## Product Management

Administrators can manage products directly from the admin dashboard.

Each product contains:

* Name
* Description
* Category
* Price
* Image

The following operations are supported:

* Add
* Edit
* Delete

Product images are currently stored in:

```text
public/products/
```

Example:

```text
/products/mouse.jpg
```

---

## Shopping Cart

Authenticated users can add products to their shopping cart.

The cart supports:

* Adding products
* Increasing quantity
* Decreasing quantity
* Removing products
* Calculating the total price

Cart data is stored in the SQLite database through the `CartItem` model.

---

## Responsive Design

The interface is designed to work on different screen sizes:

* Desktop
* Tablet
* Mobile

Tailwind CSS is used for responsive layouts and styling.

---

## Dark Mode

PCStore supports light and dark themes using `next-themes`.

Users can switch between themes from the website interface.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mahmoodslr/Nextjs-files.git
cd Nextjs-files/PCStore
```

Move into the project directory:

```bash
cd PCStore
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@pcstore.com"
```

Do not commit the `.env` file to GitHub.

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Prisma Studio

Prisma Studio can be used to view and manage the database.

Run:

```bash
npx prisma studio
```

Prisma Studio allows you to inspect:

* Users
* Products
* Cart Items

---

## Useful Prisma Commands

Check migration status:

```bash
npx prisma migrate status
```

Create a new migration:

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

## Main Pages

| Route    | Description            |
| -------- | ---------------------- |
| `/`      | Home page and products |
| `/login` | Login and registration |
| `/cart`  | Shopping cart          |
| `/admin` | Admin dashboard        |

---

## Admin Login

Open:

```text
http://localhost:3000/login
```

Use the administrator credentials configured for the local development environment.

After successful login, open:

```text
http://localhost:3000/admin
```

For a real production application, administrator credentials should be changed and managed securely.

---

## Development Commands

Start the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Run ESLint:

```bash
npm run lint
```

---

This project demonstrates the use of:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Prisma ORM
* SQLite
* REST API routes
* Authentication
* HTTP-only cookies
* Password hashing
* Database relationships
* CRUD operations
* Shopping cart functionality
* Admin dashboard
* Responsive UI
* Light and dark mode
