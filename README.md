# 🏠 Abode Prep Stack

This project is a full-stack boilerplate for a modern property data lookup and automation service. It's designed for fast prototyping using production-ready technologies like Redis, PostgreSQL, Docker, Prisma, BullMQ, and a modern React + Tailwind frontend.

---

## 🔧 Tech Stack

### Backend

- **Node.js** + **Express** — lightweight REST API
- **Prisma ORM** — type-safe PostgreSQL data modeling
- **PostgreSQL** — primary relational data store
- **Redis + BullMQ** — background job processing
- **Docker Compose** — service orchestration
- **ts-node-dev** — live reload in development

### Frontend

- **Vite** — lightning-fast frontend tooling
- **React + TypeScript**
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — prebuilt, headless components
- **React Router** — routing

---

## ⚙️ Project Structure

```bash
.
├── backend/                # Express API + background jobs
│   ├── src/
│   │   ├── jobs/           # BullMQ processors
│   │   ├── queues/         # BullMQ queue definitions
│   │   ├── routes/         # API routes
│   │   ├── lib/            # DB and utility clients
│   ├── prisma/             # Prisma schema and migrations
│   └── Dockerfile
│
├── frontend/               # Vite + React + Tailwind app
│   ├── src/pages/          # Pages (e.g., Address Lookup)
│   ├── components/ui/      # Reusable UI components (shadcn)
│   └── index.html
│
├── backend/docker-compose.yml  # Service definitions (Postgres, Redis, Backend, Worker)
```

---

## 🚀 Getting Started

### Prerequisites

- Docker + Docker Compose
- Node.js 18+
- (Optional) `pnpm` or `bun` for faster local installs

### Local Dev Setup

```bash
# Start all containers (Postgres, Redis, Backend, Worker)
docker compose up --build

# Frontend (in separate terminal)
cd frontend
npm install
npm run dev
```

---

## 🧠 Features Demonstrated

- Full-stack job queue integration via Redis and BullMQ
- Background job processing in Dockerized worker
- Prisma for migrations + data access
- React app that submits a job and polls for its result
- Dev-time hot reload for backend via ts-node-dev
- Docker Compose orchestration across services

---

## 📬 Example Use Case

A user submits an address to look up public data (e.g. HCAD in Houston). A background job queues the request, does a simulated lookup, and stores the result. The frontend polls for the status and displays the final result in a responsive UI.

---

## 👨‍💻 Author

Built by Ade Bello — Senior Software Engineer

---
