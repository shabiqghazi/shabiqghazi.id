FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (semua dulu, termasuk dev)
RUN npm ci

# Copy source code
COPY . .

# Build the Nuxt app
RUN npm run build

# Hapus dev dependencies untuk hasil akhir yang ringan
RUN npm prune --omit=dev

# Expose port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the app
CMD ["node", ".output/server/index.mjs"]
