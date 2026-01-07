# Development Dockerfile dengan Hot Reload
FROM node:20-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server dengan hot reload
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
