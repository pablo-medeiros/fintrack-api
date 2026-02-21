# 🚀 FinTrack API

REST API for financial tracking built with Node.js, TypeScript and Prisma.

---

## 📌 About

FinTrack API is a backend service designed to manage:

- User authentication (JWT)
- Financial transactions
- Account management
- Secure token refresh
- Standardized API responses

This API follows REST principles and uses Bearer Token authentication.

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger (OpenAPI)

---

## 🔐 Authentication Flow

1. Register a user  
   `POST /api/auth/register`

2. Login  
   `POST /api/auth/login`

3. Copy the accessToken

4. Click **Authorize** in Swagger and paste the token

5. Access protected routes

---

## ⚙️ Installation

```bash
git clone https://github.com/pablo-medeiros/fintrack-api.git
cd fintrack-api
npm install
```

---

## 🔧 Environment Variables

Create a .env file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/fintrack_db
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
PORT=3000
```

---

## 🗄 Database Setup

```bash
npx prisma generate
npx prisma migrate dev
```

---

## ▶️ Running the Project

Development:
```bash
npm run dev
```
Production:
```bash
npm run build
npm start
```

---

## 📘 API Documentation

Swagger UI available at:

```
http://localhost:3000/api-docs
```

---

## 📦 API Response Pattern

Success
```json
{
  "status": "success",
  "data": {}
}
```
Error
```json
{
  "status": "error",
  "message": "Error message"
}
```

---

## 🧪 Running Tests

```bash
npm run test
```

----

## 📄 License

MIT