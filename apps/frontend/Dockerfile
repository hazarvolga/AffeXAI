# Multi-stage build for Next.js Frontend
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files (including package-lock.json from root)
COPY package.json package-lock.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY packages/shared-types/package*.json ./packages/shared-types/
COPY packages/shared-types/src ./packages/shared-types/src
COPY packages/shared-types/tsconfig.json ./packages/shared-types/

# Install dependencies
RUN npm ci --legacy-peer-deps

# Build shared-types package
WORKDIR /app/packages/shared-types
RUN npm run build

# Copy source code
WORKDIR /app
COPY apps/frontend ./apps/frontend

# Build-time args (Coolify will inject ALL env vars as ARGs)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SOCKET_URL
ARG NEXT_PUBLIC_APP_URL
ARG NODE_ENV=production

# Build Next.js app
WORKDIR /app/apps/frontend
RUN echo "=== BUILD STARTING ===" && \
    echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" && \
    echo "NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL}" && \
    echo "NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}" && \
    echo "NODE_ENV=${NODE_ENV}" && \
    echo "=== RUNNING NPM RUN BUILD ===" && \
    NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}" \
    NEXT_PUBLIC_SOCKET_URL="${NEXT_PUBLIC_SOCKET_URL}" \
    NEXT_PUBLIC_APP_URL="${NEXT_PUBLIC_APP_URL}" \
    NODE_ENV="${NODE_ENV}" \
    npm run build

# Production stage
FROM node:18-alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app

# Copy package files (including package-lock.json from root)
COPY package.json package-lock.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install production dependencies only
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built application from builder
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/next.config.ts ./apps/frontend/
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start Next.js
WORKDIR /app/apps/frontend
CMD ["npm", "start"]
