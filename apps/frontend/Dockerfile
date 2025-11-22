# Multi-stage build for Next.js Frontend
FROM node:20-alpine AS builder

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

# Ensure node_modules are accessible for build (symlink from root)
RUN ln -s /app/node_modules /app/apps/frontend/node_modules || true

# Build-time args (Coolify will inject ALL env vars as ARGs)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SOCKET_URL
ARG NEXT_PUBLIC_APP_URL
ARG NODE_ENV=production

# Set as ENV for Next.js build
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_SOCKET_URL=${NEXT_PUBLIC_SOCKET_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NODE_ENV=${NODE_ENV}

# Build Next.js app
WORKDIR /app/apps/frontend

# Debug: Check node_modules structure and Tiptap packages
RUN echo "=====================================" && \
    echo "DEBUG: Checking build environment" && \
    echo "=====================================" && \
    echo "" && \
    echo "1. Current directory:" && \
    pwd && \
    echo "" && \
    echo "2. node_modules symlink status:" && \
    ls -la | grep node_modules && \
    echo "" && \
    echo "3. Checking @tiptap packages:" && \
    ls -la node_modules/@tiptap 2>/dev/null || echo "ERROR: @tiptap directory not found!" && \
    echo "" && \
    echo "4. Checking specific Tiptap packages:" && \
    ls node_modules/@tiptap/core 2>/dev/null && echo "✓ @tiptap/core found" || echo "✗ @tiptap/core NOT FOUND" && \
    ls node_modules/@tiptap/react 2>/dev/null && echo "✓ @tiptap/react found" || echo "✗ @tiptap/react NOT FOUND" && \
    ls node_modules/@tiptap/starter-kit 2>/dev/null && echo "✓ @tiptap/starter-kit found" || echo "✗ @tiptap/starter-kit NOT FOUND" && \
    echo "" && \
    echo "5. Checking if symlink is working:" && \
    readlink node_modules && \
    echo "=====================================" && \
    echo ""

# Run build - capture full output even on failure
RUN npm run build 2>&1 | tee /tmp/build-output.log; \
    BUILD_EXIT=$?; \
    if [ $BUILD_EXIT -ne 0 ]; then \
        echo ""; \
        echo "=====================================" && \
        echo "BUILD FAILED - Full output above" && \
        echo "=====================================" && \
        echo "Exit code: $BUILD_EXIT" && \
        exit 1; \
    fi

# Production stage
FROM node:20-alpine AS production

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
