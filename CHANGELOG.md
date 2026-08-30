# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-08-29

### Added
- User entity with email, username, password hash, avatar, admin status
- Character entity with name, class (24 BDO classes), level, experience, gear score, season character
- Database migrations for users and characters tables with proper indexes and foreign keys
- User module with repository pattern (UserRepository, UserService, UserController)
- Character module with repository pattern (CharacterRepository, CharacterService, CharacterController)
- RESTful API endpoints for user and character management
- Swagger documentation for new endpoints
- bcrypt password hashing (cost factor 12)
- TypeORM data source configuration for CLI migrations

### Technical
- Repository pattern implementation for data access layer
- UUID primary keys for all entities
- Cascade delete: characters deleted when user is deleted
- Database indexes on email, username, character name, user_id
- Migration-based schema management (no synchronize in production)
- Type-safe relations with FindOptionsRelations

### Documentation
- Updated ROADMAP.md with v0.2 completion status
- Updated CHANGELOG.md

## [0.1.0] - 2026-08-28

### Added
- Initial project structure with monorepo setup
- Angular 20 frontend with Tailwind CSS v4
- NestJS backend with TypeORM and PostgreSQL
- Docker Compose for development environment
- Health check endpoints (`/api/health`, `/api/health/ready`, `/api/health/live`)
- Swagger/OpenAPI documentation at `/api/docs`
- Global validation pipe with class-validator
- CORS configuration for frontend
- ESLint and Prettier configuration
- Git repository with conventional commits structure
- Environment configuration with .env.example
- Root workspace package.json with convenient scripts

### Technical
- TypeScript strict mode enabled
- Frontend: Standalone components, Signals, Reactive Forms
- Backend: Clean architecture modules, Repository pattern, Guards
- Database: TypeORM with synchronize in development
- Docker: Multi-stage builds for production

### Documentation
- README.md with project overview and setup instructions
- ARCHITECTURE.md with detailed architecture documentation
- CONTRIBUTING.md with contribution guidelines
- ROADMAP.md with version plan and progress tracking