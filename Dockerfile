# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json & package-lock.json / pnpm-lock.yaml
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua source code
COPY . .

# Build aplikasi
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy hasil build dari stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi nginx (opsional, jika perlu custom)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
