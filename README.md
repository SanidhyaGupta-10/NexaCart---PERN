# 🛒 NexaCart – Modern PERN + Bun E-Commerce Platform

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Bun](https://img.shields.io/badge/Runtime-Bun-black)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black)

NexaCart is a high-performance, full-stack e-commerce platform built using the **PERN** stack, optimized with **Bun** for lightning-fast backend execution and **Next.js** for a production-ready frontend featuring Server-Side Rendering (SSR).

The project emphasizes type-safe database access, scalable architecture, and modern developer tooling to provide a seamless shopping experience and a robust developer workflow.

---

## ✨ Highlights

- 🛒 **Full-Stack E-Commerce:** End-to-end shopping functionality.
- ⚡ **Next.js Power:** Server-Side Rendering (SSR) and API routes for optimal SEO and performance.
- 🧬 **Type-Safe ORM:** Database management via Drizzle ORM for end-to-end type safety.
- 📦 **Relational Modeling:** Robust PostgreSQL schema design.
- 🎨 **Modern UI:** Styled with Tailwind CSS for a responsive, sleek design.
- 🟦 **TypeScript Native:** Written entirely in TypeScript for better maintainability.
- 🚀 **Production-Ready:** Architected with scalability and deployment in mind.

---

## 🧰 Tech Stack

### Backend
- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [Express.js](https://expressjs.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database:** PostgreSQL

### Frontend
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching:** TanStack Query & React Server Components

---

## 📂 Project Structure

```text
NexaCart/
│
├── app/              # Next.js App Router (Frontend)
│   ├── (routes)/     # Page routes
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utilities and shared logic
│   └── hooks/        # Custom React hooks
│
├── server/           # Express + Bun Backend
│   ├── src/
│   │   ├── routes/      # API Endpoints
│   │   ├── controllers/ # Request handlers
│   │   ├── db/          # Connection logic
│   │   └── middleware/  # Auth & Validation
│
└── drizzle/          # Database schema & migrations
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/SanidhyaGupta-10/NexaCart.git
cd NexaCart
```

### 2. Backend Setup
Navigate to the server directory and install dependencies using Bun:
```bash
cd server
bun install
```

Create a `.env` file in the `server/` directory:
```env
DATABASE_URL=your_postgres_connection_string
PORT=5000
```

Generate and run database migrations:
```bash
bun drizzle-kit generate
bun drizzle-kit migrate
```

Start the development server:
```bash
bun run dev
```

### 3. Frontend Setup
Navigate to the root/app directory and install dependencies:
```bash
cd ..
bun install
bun run dev
```
The frontend will be accessible at `http://localhost:3000`.

---

## 🚀 Deployment Strategy

| Component | Recommended Platform |
| :--- | :--- |
| **Frontend** | [Vercel](https://vercel.com) (Optimized for Next.js) |
| **Backend** | [Railway](https://railway.app) / [Render](https://render.com) |
| **Database** | [Neon](https://neon.tech) / [Supabase](https://supabase.com) (Serverless Postgres) |

---

## 🎯 Learning Outcomes

Building NexaCart provides hands-on experience with:
- Designing scalable **full-stack architectures**.
- Utilizing **Bun** as a high-performance Node.js alternative.
- Implementing **SSR and hybrid rendering** patterns in Next.js.
- Managing relational schemas and migrations with **Drizzle ORM**.
- Developing production-grade **REST APIs**.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).