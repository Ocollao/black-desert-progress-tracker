# Architecture Documentation

## Overview

Black Desert Progress Tracker follows a clean architecture pattern with clear separation of concerns between frontend and backend.

## Monorepo Structure

```
black-desert-progress-tracker/
├── apps/
│   ├── frontend/          # Angular 20 Application
│   └── backend/           # NestJS Application
├── database/
│   ├── migrations/        # TypeORM Migrations
│   └── seeds/            # Seed Scripts
├── docs/                 # Documentation
├── docker/               # Docker Configurations
└── .github/workflows/    # CI/CD Pipelines
```

## Frontend Architecture (Angular)

### Layer Structure

```
src/
├── app/
│   ├── core/              # Core module (singletons, guards, interceptors)
│   │   ├── auth/          # Authentication services, guards
│   │   ├── http/          # HTTP interceptors
│   │   └── services/      # Core services
│   ├── shared/            # Shared module (components, pipes, directives)
│   │   ├── components/    # Reusable UI components
│   │   ├── pipes/         # Custom pipes
│   │   └── directives/    # Custom directives
│   ├── features/          # Feature modules (lazy-loaded)
│   │   ├── dashboard/
│   │   ├── characters/
│   │   ├── progression/
│   │   ├── lifeskills/
│   │   ├── challenges/
│   │   └── settings/
│   ├── layout/            # Layout components (header, sidebar, footer)
│   ├── app.config.ts      # Application configuration
│   ├── app.routes.ts      # Route configuration
│   └── app.ts             # Root component
├── assets/                # Static assets
├── environments/          # Environment configurations
└── styles.scss            # Global styles (Tailwind CSS v4)
```

### Key Patterns

- **Standalone Components** - No NgModules for components
- **Signals** - Fine-grained reactivity for state management
- **Reactive Forms** - Form handling with validation
- **Lazy Loading** - Route-based code splitting
- **HTTP Interceptors** - Auth token injection, error handling
- **Guards** - Route protection for authenticated areas

## Backend Architecture (NestJS)

### Layer Structure

```
src/
├── app.module.ts          # Root module
├── main.ts                # Application entry point
├── common/                # Shared utilities
│   ├── decorators/        # Custom decorators
│   ├── filters/           # Exception filters
│   ├── guards/            # Auth guards
│   ├── interceptors/      # Request/response interceptors
│   ├── pipes/             # Validation pipes
│   └── dto/               # Shared DTOs
├── config/                # Configuration modules
├── modules/               # Feature modules
│   ├── auth/
│   │   ├── dto/
│   │   ├── guards/
│   │   ├── strategies/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/
│   ├── characters/
│   ├── items/
│   ├── equipment/
│   ├── progression/
│   ├── lifeskills/
│   ├── challenges/
│   ├── reminders/
│   ├── achievements/
│   └── health/
├── database/
│   ├── entities/          # TypeORM Entities
│   ├── migrations/        # Migration files
│   └── seeds/             # Seed scripts
└── types/                 # Shared TypeScript types
```

### Module Organization (Clean Architecture)

Each feature module follows:

```
module/
├── domain/                # Domain layer (entities, value objects, domain events)
│   ├── entities/
│   ├── value-objects/
│   └── events/
├── application/           # Application layer (use cases, DTOs, ports)
│   ├── dto/
│   ├── ports/             # Interfaces for repositories, external services
│   └── use-cases/
├── infrastructure/        # Infrastructure layer (implementations)
│   ├── persistence/       # TypeORM repositories
│   ├── external/          # External API clients
│   └── config/
├── presentation/          # Presentation layer (controllers, presenters)
│   ├── controllers/
│   └── dto/
└── module.ts              # Module definition
```

### Key Patterns

- **Dependency Injection** - Constructor-based DI
- **DTOs with class-validator** - Input validation
- **Repository Pattern** - Data access abstraction
- **Guards** - Authentication/Authorization
- **Interceptors** - Logging, transformation
- **Filters** - Global exception handling
- **Pipes** - Validation, transformation

## Database Architecture

### PostgreSQL with TypeORM

- **Entities** - Decorated TypeScript classes
- **Migrations** - Version-controlled schema changes
- **Seeds** - Initial data population
- **Relations** - Explicit foreign keys and joins

### Naming Conventions

- Tables: `snake_case` (e.g., `character_equipment`)
- Columns: `snake_case` (e.g., `enhancement_level`)
- Primary Keys: `id` (UUID)
- Foreign Keys: `{entity}_id` (e.g., `character_id`)
- Timestamps: `created_at`, `updated_at`

## API Design

### REST Conventions

| Resource | GET | POST | PATCH | DELETE |
|----------|-----|------|-------|--------|
| Collection | List | Create | - | - |
| Item | Get | - | Update | Delete |

### Response Format

```json
{
  "data": {},
  "meta": {}
}
```

### Error Format

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

## Authentication & Authorization

### JWT Flow

1. User registers/logs in → receives access token
2. Client includes token in `Authorization: Bearer <token>`
3. Guard validates token on protected routes
4. Token contains user ID and roles

### Roles

- `user` - Standard user
- `admin` - Administrative access

## Security Considerations

- Password hashing with bcrypt (cost factor 12)
- JWT with RS256 or HS256
- CORS configured for frontend origin
- Rate limiting on auth endpoints
- Input validation on all endpoints
- Helmet.js for security headers
- Environment variables for secrets

## Deployment Architecture

### Development

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│  PostgreSQL │
│  (4200)     │     │   (3000)    │     │   (5432)    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Production

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────▶│   Backend   │────▶│  PostgreSQL │
│   (80/443)  │     │  (3000)     │     │  (5432)     │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ▼                   ▼
  Static Files         API + Swagger
```

## Scalability Considerations

- Stateless backend services
- Database connection pooling
- Redis for caching (future)
- Horizontal pod scaling (Kubernetes)
- CDN for static assets