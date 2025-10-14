FROM node:20-bookworm AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN npm run build


FROM node:20-bookworm
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]
