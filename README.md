# Affexai - Enterprise Business Management Platform

Modern, scalable business management platform built with NestJS, Next.js, and PostgreSQL.

## 🏗️ Architecture

Monorepo structure using npm workspaces:

```
Affexai/
├── apps/
│   ├── backend/          # NestJS API (Port 9006)
│   └── frontend/         # Next.js App (Port 9003)
├── packages/
│   └── shared-types/     # Shared TypeScript types
└── docker/               # Infrastructure services
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥18
- Docker & Docker Compose
- PostgreSQL client (optional, for direct DB access)

### Installation

```bash
# Clone and install
cd Affexai
npm install

# Start infrastructure services (PostgreSQL, Redis, MinIO)
npm run docker:up

# Start development servers (RECOMMENDED - Safe startup with port cleanup)
npm start
# OR
./start-dev.sh

# Alternative: Start services separately
npm run dev:backend   # Backend only
npm run dev:frontend  # Frontend only
npm run dev           # Both (parallel, may have port conflicts)
```

### Stopping Services

```bash
# Stop development servers (keeps Docker running)
npm stop
# OR
./stop-dev.sh

# Stop Docker services
npm run docker:down
```

### Services

| Service | Port | URL |
|---------|------|-----|
| Frontend | 9003 | http://localhost:9003 |
| Backend | 9006 | http://localhost:9006 |
| PostgreSQL | 5434 | localhost:5434 |
| Redis | 6380 | localhost:6380 |
| MinIO | 9007 | http://localhost:9007 |
| MinIO Console | 9008 | http://localhost:9008 |

## 🔧 Development

### Backend (NestJS)
```bash
cd apps/backend
npm run start:dev
```

### Frontend (Next.js)
```bash
cd apps/frontend
npm run dev
```

### Shared Types
```bash
cd packages/shared-types
npm run build
```

## 🗄️ Database

### Connection
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/affexai_dev
```

### Migrations
```bash
cd apps/backend
npm run migration:run
npm run migration:revert  # rollback
npm run migration:generate -- MigrationName
```

## 🐳 Docker

### Commands
```bash
npm run docker:up      # Start all services
npm run docker:down    # Stop all services
npm run docker:logs    # View logs
```

### Manual Docker Compose
```bash
cd docker
docker compose up -d
docker compose down
docker compose logs -f [service]
```

## 📦 Package Management

### Install Dependencies
```bash
npm install                    # Root + all workspaces
npm install -w apps/backend    # Specific workspace
```

### Add Dependencies
```bash
npm install <package> -w apps/backend
npm install <package> -w apps/frontend
npm install <package> -w packages/shared-types
```

## 🏗️ Build

```bash
npm run build              # Build all packages
npm run build:backend      # Backend only
npm run build:frontend     # Frontend only
npm run build:shared       # Shared types only
```

## 🔐 Environment Variables

### Backend (.env)
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/affexai_dev
JWT_SECRET=your-secret-here
PORT=9006
S3_ENDPOINT=http://localhost:9007
REDIS_HOST=localhost
REDIS_PORT=6380
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:9006
NEXT_PUBLIC_APP_NAME=Affexai
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/affexai_dev
```

## 📚 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for database operations
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **MinIO** - S3-compatible object storage

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library

### Shared
- **TypeScript** - Shared types and interfaces
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## 📖 API Documentation

API documentation is available at:
- Development: http://localhost:9006/api/docs
- Swagger UI with interactive endpoints

## 🔄 Migration from Aluplan

This project is a clean restructuring of the Aluplan system with:
- ✅ Isolated Docker containers (no port conflicts)
- ✅ Proper monorepo structure
- ✅ Updated package scopes (@affexai)
- ✅ Separate database (affexai_dev)
- ✅ Both systems can run simultaneously

### Port Mapping

| Service | Aluplan | Affexai |
|---------|---------|---------|
| Frontend | 9002 | 9003 |
| Backend | 9005 | 9006 |
| PostgreSQL | 5433 | 5434 |
| Redis | 6379 | 6380 |
| MinIO | 9000 | 9007 |
| MinIO Console | 9001 | 9008 |

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## 📝 License

Private - All Rights Reserved

## 📧 Support

For support, please contact the development team.
