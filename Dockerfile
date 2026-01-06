# syntax=docker/dockerfile:1

# Stage 1: Build
FROM oven/bun:1 AS builder
WORKDIR /app

# Copy dependency files
COPY package.json bun.lock ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma Client
RUN bun install --frozen-lockfile
RUN bun x prisma generate

# Copy the rest of the source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Run
FROM node:20-slim AS runner
WORKDIR /app

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy built assets from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/bun.lock ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the port SvelteKit runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["node", "build"]
