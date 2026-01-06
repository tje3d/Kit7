# 🚀 Kit7 - Enterprise User Management System

[![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)](https://prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-Runtime-000000?logo=bun&logoColor=white)](https://bun.sh)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://docker.com)

A modern, high-performance enterprise user management dashboard. Built with the latest stack for speed, reliability, and developer experience.

![Dashboard Preview](https://raw.githubusercontent.com/your-username/kit7/main/static/preview.png) *(Add a screenshot here)*

## ✨ Features

- **⚡ Next-Gen Performance**: Built on Svelte 5 and SvelteKit 2 for blazing-fast interactions and SSR support.
- **👥 Full User Lifecycle**: Seamlessly create, read, update, and delete users with a polished interface.
- **🔍 Advanced Search & Filtering**: Real-time user search with URL-persistent state for easy sharing and bookmarking.
- **📄 Server-side Pagination**: High-performance data handling for thousands of records.
- **🛡️ Enterprise Ready**: Type-safe database interactions with Prisma 7 and a robust Postgres backend.
- **🎨 Modern UI**: Beautiful, responsive design using Tailwind CSS and Lucide icons.
- **🐳 Containerized**: First-class Docker support for consistent development and production environments.

## 🛠️ Tech Stack

- **Framework**: [SvelteKit 2](https://kit.svelte.dev/) (powered by [Svelte 5](https://svelte.dev/))
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Runtime**: [Bun](https://bun.sh/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Deployment**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Bun](https://bun.sh/) (Recommended) or Node.js
- [Docker](https://www.docker.com/) & Docker Compose

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kit7.git
   cd kit7
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   *Update the `DATABASE_URL` in `.env` if your local setup differs.*

4. **Start Database**
   ```bash
   docker-compose up -d
   ```

5. **Database Migration**
   ```bash
   bun run db:migrate
   ```

6. **Start Development Server**
   ```bash
   bun run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📖 Development Commands

| Command | Description |
| :--- | :--- |
| `bun run dev` | Starts the Vite development server |
| `bun run build` | Builds the application for production |
| `bun run preview` | Previews the production build locally |
| `bun run db:push` | Pushes the Prisma schema to the database |
| `bun run db:migrate` | Creates and applies a new migration |
| `bun run db:studio` | Opens Prisma Studio to view/edit data |
| `bun run check` | Runs svelte-check for type and syntax errors |

## 📂 Project Structure

```text
kit7/
├── prisma/             # Database schema and migrations
├── src/
│   ├── generated/      # Custom Prisma-generated models
│   ├── lib/
│   │   ├── components/ # Reusable UI components (Button, Input, etc.)
│   │   └── server/     # Server-only logic (Prisma client)
│   └── routes/         # SvelteKit pages and API routes
├── static/             # Static assets
├── Dockerfile          # Production Docker image configuration
└── docker-compose.yml  # Local development services
```

## 🚢 Deployment

### Production with Docker

Build and run the production container:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

The application will be available on the port specified in your production configuration.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name](https://github.com/your-username)
