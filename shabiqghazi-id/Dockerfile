# -------------------------
# Stage 1: Build
# -------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build Nuxt project
RUN npm run build

# -------------------------
# Stage 2: Production image
# -------------------------
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm ci --omit=dev

# Expose port (default Nuxt 3 SSR port)
EXPOSE 3000

# Set environment variables (optional, bisa juga pakai docker-compose)
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start Nuxt server
CMD ["node", ".output/server/index.mjs"]
