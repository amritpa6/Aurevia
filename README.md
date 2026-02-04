<!-- Project: Aurelia - Full-stack car rental platform -->
# Aurelia

![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)
![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB)
![Vite](https://img.shields.io/badge/DevTool-Vite-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)
![License](https://img.shields.io/badge/License-Not%20specified-lightgrey)

Aurelia is a full-stack car rental application with role-based access for users and owners. Users can browse and book cars, while owners can list cars, manage bookings, and track dashboard stats. The frontend is built with React + Vite, and the backend is built with Express + MongoDB.

---

## Table of Contents
- [Description](#description)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Architecture Flow](#architecture-flow)
- [Data & Storage](#data--storage)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Scripts](#scripts)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Description
Aurelia supports two main roles:

- `user`: register/login, browse available cars, check availability by location/date, create bookings, and view personal bookings.
- `owner`: switch role to owner, list cars with image upload, toggle availability, soft-delete cars, manage booking status, and view dashboard metrics.

Core capabilities:

- JWT-based authentication and protected routes
- Car listing with image upload to ImageKit
- Booking overlap checks for date availability
- Owner dashboard with booking and revenue summaries
- Soft delete support for cars (`isDeleted`) to preserve booking history

## Technologies Used
- React 19 + React Router
- Vite
- Tailwind CSS v4
- Axios
- React Hot Toast
- Motion (animations)
- Node.js + Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) + `bcrypt`
- Multer (file uploads)
- ImageKit (media hosting)
- Nodemon (backend development)

## Project Structure
```text
CarRental/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── configs/
│   │   ├── db.js
│   │   └── imageKit.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## Architecture Flow
```text
React (Vite) Client  <----HTTP---->  Express API  <----> MongoDB
        |                                 |
        |                                 +--> JWT Auth Middleware
        |                                 +--> ImageKit (car/user images)
        |
        +--> AppContext manages auth token, user, owner state, cars, dates
```

## Data & Storage
- Database: MongoDB (via Mongoose)
- Main collections:
  - `users`: profile, email, hashed password, role (`user`/`owner`), image
  - `cars`: owner reference, specs, pricing, location, availability, soft delete
  - `bookings`: user/car/owner references, pickup/return dates, status, total price
- Images:
  - Uploaded through Multer
  - Stored in ImageKit (`/cars`, `/users` folders)

---

## Installation & Setup
Prerequisites:
- Node.js 18+ recommended
- npm
- MongoDB connection string
- ImageKit account credentials

1. Clone and install

```zsh
git clone https://github.com/amritpa6/Aurelia.git
cd Aurelia
```

2. Backend setup

```zsh
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
PORT=3000
```

Run backend:

```zsh
npm run server
```

3. Frontend setup

```zsh
cd ../client
npm install
```

Create `client/.env` (optional but recommended):

```env
VITE_BASE_URL=http://localhost:3000
VITE_CURRENCY=$
```

Run frontend:

```zsh
npm run dev
```

Frontend default: `http://localhost:5173`  
Backend default: `http://localhost:3000`

## Usage
- Open frontend and register/login as a user.
- Browse featured cars or all cars.
- Select location + dates and book available cars.
- Switch role to owner from navbar (`List Cars`).
- As owner, access `/owner` dashboard to:
  - add cars
  - manage cars
  - manage incoming bookings

## Scripts
- `server/package.json`
  - `npm run server` -> starts backend with nodemon
  - `npm start` -> starts backend with node

- `client/package.json`
  - `npm run dev` -> starts Vite dev server
  - `npm run build` -> production build
  - `npm run preview` -> preview production build
  - `npm run lint` -> run ESLint
  - `npm run format` -> run Prettier

---

## API Overview
Base URL: `/api`

User routes:
- `POST /user/register`
- `POST /user/login`
- `GET /user/data` (protected)
- `GET /user/cars`

Owner routes:
- `POST /owner/change-role` (protected)
- `POST /owner/add-car` (protected, multipart/form-data with `image` + `carData`)
- `GET /owner/cars` (protected)
- `POST /owner/toggle-car` (protected)
- `POST /owner/delete-car` (protected, soft delete)
- `GET /owner/dashboard` (protected)
- `POST /owner/update-image` (protected, multipart/form-data)

Booking routes:
- `POST /booking/check-availability`
- `POST /booking/create` (protected)
- `GET /booking/user` (protected)
- `GET /booking/owner` (protected, owner only)
- `POST /booking/change-status` (protected)

## Environment Variables
Server (`server/.env`):
- `MONGODB_URI`
- `JWT_SECRET`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`
- `IMAGEKIT_URL_ENDPOINT`
- `PORT` (optional)

Client (`client/.env`):
- `VITE_BASE_URL` (API host for Axios)
- `VITE_CURRENCY` (currency symbol shown in UI)

## Troubleshooting
- `401 Unauthorized` on protected routes:
  - Ensure JWT token is present and sent in `Authorization: Bearer <token>`.
- `404` API errors:
  - Verify frontend is calling the exact backend route path.
- Car upload errors:
  - Ensure multipart request includes `image` and valid JSON string in `carData`.
- ImageKit upload issues:
  - Recheck `IMAGEKIT_*` environment variables.
- MongoDB connection issues:
  - Confirm `MONGODB_URI` is valid and reachable.

## Contributing
1. Create a feature branch:
```bash
git checkout -b feature/your-feature
```
2. Make changes and commit:
```bash
git add .
git commit -m "feat: short description"
```
3. Push and open a pull request:
```bash
git push origin feature/your-feature
```

---
