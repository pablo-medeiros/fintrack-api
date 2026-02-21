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