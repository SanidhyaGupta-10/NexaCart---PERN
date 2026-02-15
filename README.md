# 🛒 NexaCart – Modern PERN + Bun E-Commerce Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Bun](https://img.shields.io/badge/Runtime-Bun-purple)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791)

NexaCart is a high-performance, full-stack e-commerce platform built with the modern **PERN stack**, replacing Node.js with **Bun** for lightning-fast execution. It features a fully type-safe API, a reactive frontend, and a clean architecture designed for scalability and production readiness.

## ✨ Highlights

- 🛒 **Full-Stack Product Store:** Complete end-to-end shopping experience.
- 🧬 **Type-Safe Queries:** Leveraging **Drizzle ORM** for robust database interactions.
- ⚡ **Optimized Data Fetching:** Utilizing **TanStack Query** for efficient caching and synchronization.
- 🎨 **Modern UI/UX:** Styled with **Tailwind CSS** and **DaisyUI** for a professional look.
- 🟦 **TypeScript First:** End-to-end type safety from the database schema to the UI components.
- 🚀 **Production Ready:** Optimized for deployment on modern cloud platforms.

## 🧰 Tech Stack

### Backend
- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **HTTP Client:** Axios

### Frontend
- **Library:** React
- **Styling:** Tailwind CSS + DaisyUI
- **State Management:** TanStack Query (React Query)

---

## 📂 Project Structure

```text
NexaCart/
│
├── client/          # React Frontend (vites/hooks/components)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│
├── server/          # Express + Bun Backend
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── db/
│   │   └── middleware/
│
└── drizzle/         # Database schema & migrations
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/NexaCart.git
cd NexaCart
```

### 2. Backend Setup
Navigate to the server directory and install dependencies using Bun:
```bash
cd server
bun install
```

Create a `.env` file in the `server` directory:
```env
DATABASE_URL=your_postgres_connection_string
PORT=5000
```

### 3. Database Migration
Synchronize your PostgreSQL schema using Drizzle Kit:
```bash
bun drizzle-kit generate
bun drizzle-kit migrate
```

### 4. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
bun install
```

### 5. Running the Application
**Start Backend:**
```bash
cd server
bun run dev
```

**Start Frontend:**
```bash
cd client
bun run dev
```

---

## 🚀 Deployment

- **Frontend:** Vercel / Netlify
- **Backend:** Railway / Render
- **Database:** Neon / Supabase (Serverless PostgreSQL)

---

## 🎯 Learning Outcomes

By exploring this project, you will master:
- **Full-stack Architecture:** Coordinating data flow between a Bun-based API and a React UI.
- **RESTful API Design:** Implementing standard patterns and middleware.
- **Database Modeling:** Designing relational schemas and managing migrations with Drizzle.
- **Modern Workflow:** Utilizing TypeScript for reducing runtime errors and improving developer experience.

## 📜 License

This project is licensed under the **MIT License**.

---

⭐ **If you find this project useful, please consider giving it a star!**
