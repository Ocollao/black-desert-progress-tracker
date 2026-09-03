# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.8] - 2026-09-03

### Added
- Sistema visual BDO consolidado con tokens CSS reales para colores, tipografia, superficies, radios, sombras y estados.
- Composicion responsive de autenticacion con iconos SVG dimensionados, centrado consistente y soporte para pantallas pequenas.
- Fuentes explicitas de Tailwind para plantillas HTML y componentes TypeScript.
- Configuracion de proxy Docker dedicada para enrutar `/api` al servicio backend.

### Changed
- Rediseño del App Shell con navegacion, marca, sidebar, profundidad visual y reticula ambiental.
- Rediseño del dashboard con hero de personaje, estadisticas interactivas, objetivo protagonista y paneles de actividad.
- Corregido el overflow horizontal producido por decoraciones transformadas en movil.
- Corregida la carga de dependencias PostCSS en el contenedor frontend.
- Ajustados los puertos documentados del backend a `3001` y la carga del archivo `.env` desde el workspace.

### Fixed
- Corregida la entrega de estilos globales para evitar paginas sin layout, con iconos gigantes o contenido colapsado a la izquierda.
- Corregido el acceso de autenticacion desde el frontend Docker.

## [0.4.7] - 2026-09-03

### Added
- Nuevo App Shell con sidebar por secciones, topbar con personaje activo y progreso global, drawer móvil y nav inferior
- Páginas nuevas: Personaje, Equipo, Progresión (árbol), Objetivos, Desafíos, LifeSkill, Aventuras y regiones, Conocimiento, Colecciones y logros, Ajustes
- Nuevos componentes reutilizables: section-heading, progress-ring, equipment-slot, item-card, activity-timeline
- Capa de datos mock separada (`core/mock/bdo-mock-data`) lista para sustituir por la API
- Dashboard rediseñado como centro del registro: perfil, progreso por pilares, siguiente objetivo recomendado, próximos objetivos y actividad reciente

## [0.4.3] - 2026-09-02

### Changed
- Updated shared UI components (avatar, badge, button, card, modal, progress)
- Improved authentication forms (login, register)
- Enhanced character management views (list, detail, form)
- Refined dashboard layout
- Updated global styles

## [0.4.2] - 2026-08-31

### Changed
- Complete UI redesign with Gold/Black/White color palette
- Simplified design system removing bronze/silver variants
- Updated all components to use strict gold accent on black backgrounds with white text
- Enhanced responsive design across all interfaces
- Improved contrast and accessibility with cleaner color scheme

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