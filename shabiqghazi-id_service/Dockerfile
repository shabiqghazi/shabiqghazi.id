# -------------------------
# Stage 1: Build
# -------------------------
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=750"

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Strapi admin panel
RUN npm run build

# -------------------------
# Stage 2: Production
# -------------------------
FROM node:20-alpine

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose default Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "run", "start"]
