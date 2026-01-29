# 🏗️ Classroom Management System — Backend API

A scalable, production-ready REST API powering a **multi-role academic management platform** with secure authentication, media handling, and high-performance data operations.

Designed with a strong focus on **performance**, **security**, and **maintainability**.

---

## 🌐 Connected Client

🎨 **Frontend Repository**
👉 [https://github.com/azmil666/classroom-frontend](https://github.com/azmil666/classroom-frontend)

---

## ⚙️ Tech Stack

### 🧠 Backend

| Technology               | Purpose                        |
| ------------------------ | ------------------------------ |
| 🟢 **Node.js**           | JavaScript runtime environment |
| 🚀 **Express.js**        | REST API framework             |
| 🗃️ **Drizzle ORM**      | Type-safe database access      |
| 🐘 **PostgreSQL (Neon)** | Serverless relational database |
| 🔐 **Better Auth**       | Authentication & authorization |
| 🛡️ **Arcjet**           | Rate limiting & bot protection |
| ☁️ **Cloudinary**        | Media storage & optimization   |

---

### 📡 DevOps & Monitoring

| Tool              | Purpose                         |
| ----------------- | ------------------------------- |
| 🤖 **CodeRabbit** | Automated code reviews          |
| 📊 **Site24x7**   | Uptime & performance monitoring |

---

## ✨ Core Capabilities

* 🔑 **Role-Based Authentication** — Secure access for Admins, Teachers, and Students
* ⚡ **High-Performance Data Layer** — Optimized queries using Drizzle ORM
* 🧑‍🎓 **Join-Code Enrollment System** — Controlled student onboarding
* 🧑‍🏫 **Faculty & Department APIs** — Structured academic management
* 📷 **Media Upload Pipeline** — Cloudinary-powered asset handling
* 🛡️ **Security Controls** — Bot protection, rate limits, and validation
* 📦 **Scalable Architecture** — Clean modular backend design

---

## 🛠️ Getting Started

### ✅ Prerequisites

* Node.js (18+ recommended)
* PostgreSQL (Neon recommended)
* npm

---

### 📦 Installation

```bash
git clone https://github.com/azmil666/classroom-backend.git
cd classroom-backend
npm install
```

---

### 🔐 Environment Configuration

Create a `.env` file in the project root:

```env
DATABASE_URL=
ARCJET_KEY=
ARCJET_ENV=development
FRONTEND_URL=http://localhost:5173
BETTER_AUTH_SECRET=
```

> Replace the values with your own credentials.

---

### ▶️ Run Locally

```bash
npm run dev
```

API will be available at:

```
http://localhost:8000
```

---

## 🔗 Related Project

🎨 **Frontend Client**
👉 [https://github.com/azmil666/classroom-frontend](https://github.com/azmil666/classroom-frontend)

---

## ⭐ If You Find This Useful

Feel free to ⭐ the repository or explore the frontend implementation.

---
