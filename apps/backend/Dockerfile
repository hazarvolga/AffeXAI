# Multi-stage build for NestJS Backend
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
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
COPY apps/backend ./apps/backend

# Build backend
WORKDIR /app/apps/backend
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY packages/shared-types/package*.json ./packages/shared-types/

# Install production dependencies only
RUN npm ci --omit=dev --legacy-peer-deps

# Copy built application from builder
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist

# Copy deployment scripts and SQL files
COPY apps/backend/.coolify-deploy.sh ./apps/backend/.coolify-deploy.sh
COPY apps/backend/mark-migrations-executed.sql ./apps/backend/mark-migrations-executed.sql
COPY apps/backend/cms-seed-data.sql ./apps/backend/cms-seed-data.sql
COPY apps/backend/scripts/sync-migrations.sh ./apps/backend/scripts/sync-migrations.sh
RUN chmod +x ./apps/backend/.coolify-deploy.sh ./apps/backend/scripts/sync-migrations.sh

# Expose port
EXPOSE 3001

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 -O /dev/null http://localhost:3001/api/health || exit 1

# Start application
CMD ["node", "apps/backend/dist/main.js"]
