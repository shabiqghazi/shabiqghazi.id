# 1️⃣ Gunakan image Node resmi
FROM node:20-bookworm AS build

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package dan install dependencies
COPY package*.json ./
RUN npm ci

# 4️⃣ Copy seluruh kode ke dalam container
COPY . .

# 5️⃣ Build project Nuxt
RUN npm run build

# 6️⃣ Stage untuk production
FROM node:20-bookworm AS production
WORKDIR /app

# Copy package.json dan node_modules dari build stage
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

# Port Nuxt
EXPOSE 3000
CMD ["npx", "nuxt", "preview", "--hostname", "0.0.0.0", "--port", "3000"]
