# Documentación de arquitectura

> **Versión actual del proyecto: 0.5.0**

## Resumen

Black Desert Progress Tracker sigue un patrón de arquitectura limpia con una separación clara de responsabilidades entre frontend y backend.

## Estructura del monorepo

```
black-desert-progress-tracker/
├── apps/
│   ├── frontend/          # Aplicación Angular 20
│   └── backend/           # Aplicación NestJS
├── database/
│   ├── migrations/        # Migraciones de TypeORM
│   └── seeds/            # Scripts de datos iniciales
├── docs/                 # Documentación
├── docker/               # Configuraciones Docker
└── .github/workflows/    # Pipelines CI/CD
```

## Arquitectura del frontend (Angular)

### Estructura de capas

```
src/
├── app/
│   ├── core/              # Núcleo (singletons, guards, interceptores)
│   │   ├── auth/          # Servicios y guards de autenticación
│   │   ├── http/          # Interceptores HTTP
│   │   └── services/      # Servicios principales
│   ├── shared/            # Módulo compartido (componentes, pipes, directivas)
│   │   ├── components/    # Componentes de interfaz reutilizables
│   │   ├── pipes/         # Pipes personalizados
│   │   └── directives/    # Directivas personalizadas
│   ├── features/          # Módulos de funcionalidad (carga perezosa)
│   │   ├── dashboard/
│   │   ├── characters/
│   │   ├── conocimiento/  # Sistema de conocimiento (árbol + detalle + recientes)
│   │   ├── progression/
│   │   ├── lifeskills/
│   │   ├── challenges/
│   │   └── settings/
│   ├── layout/            # Componentes de layout (cabecera, sidebar, pie)
│   ├── app.config.ts      # Configuración de la aplicación
│   ├── app.routes.ts      # Configuración de rutas
│   └── app.ts             # Componente raíz
├── assets/                # Recursos estáticos
├── environments/          # Configuraciones de entorno
└── styles.scss            # Estilos globales (Tailwind CSS v4)
```

### Patrones clave

- **Componentes standalone** - Sin NgModules para componentes
- **Signals** - Reactividad de grano fino para gestión de estado
- **Formularios reactivos** - Manejo de formularios con validación
- **Carga perezosa** - División de código por rutas
- **Interceptores HTTP** - Inyección de token de autenticación y manejo de errores
- **Guards** - Protección de rutas para áreas autenticadas

## Arquitectura del backend (NestJS)

### Estructura de capas

```
src/
├── app.module.ts          # Módulo raíz
├── main.ts                # Punto de entrada de la aplicación
├── common/                # Utilidades compartidas
│   ├── decorators/        # Decoradores personalizados
│   ├── filters/           # Filtros de excepciones
│   ├── guards/            # Guards de autenticación
│   ├── interceptors/      # Interceptores de request/response
│   ├── pipes/             # Pipes de validación
│   └── dto/               # DTOs compartidos
├── config/                # Módulos de configuración
├── modules/               # Módulos de funcionalidad
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
│   ├── knowledge/         # Conocimiento: árbol, recientes, energía, requisitos
│   ├── assets/            # Servido de iconos desde BDO_DATA_DIR
│   ├── equipment/
│   ├── progression/
│   ├── lifeskills/
│   ├── challenges/
│   ├── reminders/
│   ├── achievements/
│   └── health/
├── database/
│   ├── entities/          # Entidades TypeORM
│   ├── migrations/        # Archivos de migración
│   ├── importer.ts        # Importador por lotes de items/knowledge
│   ├── scrape-bdocodex.ts # Scraper seguro (tras flag) + seed de energía
│   └── seeds/             # Scripts de datos iniciales
└── types/                 # Tipos TypeScript compartidos
```

### Organización de módulos (arquitectura limpia)

Cada módulo de funcionalidad sigue:

```
module/
├── domain/                # Capa de dominio (entidades, objetos de valor, eventos)
│   ├── entities/
│   ├── value-objects/
│   └── events/
├── application/           # Capa de aplicación (casos de uso, DTOs, puertos)
│   ├── dto/
│   ├── ports/             # Interfaces de repositorios y servicios externos
│   └── use-cases/
├── infrastructure/        # Capa de infraestructura (implementaciones)
│   ├── persistence/       # Repositorios TypeORM
│   ├── external/          # Clientes de APIs externas
│   └── config/
├── presentation/          # Capa de presentación (controladores, presentadores)
│   ├── controllers/
│   └── dto/
└── module.ts              # Definición del módulo
```

### Patrones clave

- **Inyección de dependencias** - DI basada en constructor
- **DTOs con class-validator** - Validación de entradas
- **Patrón repositorio** - Abstracción del acceso a datos
- **Guards** - Autenticación/autorización
- **Interceptores** - Logging y transformación
- **Filtros** - Manejo global de excepciones
- **Pipes** - Validación y transformación

## Arquitectura de base de datos

### PostgreSQL con TypeORM

- **Entidades** - Clases TypeScript decoradas
- **Migraciones** - Cambios de esquema versionados
- **Seeds** - Población inicial de datos
- **Relaciones** - Claves foráneas y joins explícitos

### Tablas de conocimiento (v0.5.0)

- `knowledge_themes` (`source_urn` única, `parent_urn` para el árbol de 11 ramas)
- `knowledge_entries` (~12.491 registros con `theme_urn`, `acquisition`, `image_path`)
- `knowledge_progress` (`user_id` + `knowledge_id` únicos, `obtained`, `obtained_at`)
- `knowledge_requirements` (requisitos previos, poblada por scrapeo)
- `knowledge_energy` (`theme_urn` PK, `energy`, `source`: manual o scrapeo)

### Convenciones de nombres

- Tablas: `snake_case` (p. ej. `character_equipment`)
- Columnas: `snake_case` (p. ej. `enhancement_level`)
- Claves primarias: `id` (UUID)
- Claves foráneas: `{entidad}_id` (p. ej. `character_id`)
- Timestamps: `created_at`, `updated_at`

## Diseño de API

### Convenciones REST

| Recurso | GET | POST | PATCH | DELETE |
|----------|-----|------|-------|--------|
| Colección | Listar | Crear | - | - |
| Elemento | Obtener | - | Actualizar | Eliminar |

### Endpoints de conocimiento (v0.5.0)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/knowledge` | Buscar entradas (filtros: `search`, `themeId`, `status`, `page`, `limit`) |
| GET | `/api/knowledge/themes/tree` | Árbol de temas con conteos y energía |
| GET | `/api/knowledge/themes` | Lista plana de temas |
| GET | `/api/knowledge/recent` | Últimos conocimientos obtenidos |
| GET | `/api/knowledge/energy` | Resumen de energía por rama |
| GET | `/api/knowledge/:id` | Obtener una entrada |
| GET | `/api/knowledge/:id/progress` | Progreso + requisitos previos |
| PUT | `/api/knowledge/:id/progress` | Marcar como obtenido |
| DELETE | `/api/knowledge/:id/progress` | Quitar obtenido |

### Formato de respuesta

```json
{
  "data": {},
  "meta": {}
}
```

### Formato de error

```json
{
  "statusCode": 400,
  "message": "Validación fallida",
  "error": "Bad Request",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/endpoint"
}
```

## Autenticación y autorización

### Flujo JWT

1. El usuario se registra/inicia sesión → recibe un token de acceso
2. El cliente incluye el token en `Authorization: Bearer <token>`
3. El guard valida el token en rutas protegidas
4. El token contiene el ID del usuario y sus roles

### Roles

- `user` - Usuario estándar
- `admin` - Acceso administrativo

## Consideraciones de seguridad

- Hash de contraseñas con bcrypt (factor de coste 12)
- JWT con RS256 o HS256
- CORS configurado para el origen del frontend
- Rate limiting en endpoints de autenticación
- Validación de inputs en todos los endpoints
- Helmet.js para cabeceras de seguridad
- Variables de entorno para secretos

## Arquitectura de despliegue

### Desarrollo (Docker)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Frontend   │────▶│   Backend   │────▶│  PostgreSQL │
│  (4201)     │     │   (3001)    │     │   (5433)    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Producción

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nginx     │────▶│   Backend   │────▶│  PostgreSQL │
│   (80/443)  │     │  (3000)     │     │  (5432)     │
└─────────────┘     └─────────────┘     └─────────────┘
        │                   │
        ▼                   ▼
   Archivos           API + Swagger
   estáticos
```

## Consideraciones de escalabilidad

- Servicios backend sin estado
- Pool de conexiones a la base de datos
- Redis para caché (futuro)
- Escalado horizontal de pods (Kubernetes)
- CDN para recursos estáticos
