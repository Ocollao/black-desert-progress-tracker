# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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