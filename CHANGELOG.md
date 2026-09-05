# Registro de cambios

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto sigue el [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-09-05

### Añadido
- Sistema de conocimiento híbrido bdocodex + BDO: árbol de 11 ramas con conteos, buscador con Reiniciar, resumen de energía y % obtenidos.
- Detalle circular tipo BDO con cómo conseguir, requisitos previos clicables, marcar como obtenido / quitar y panel de últimos conocimientos.
- Endpoints `GET /knowledge/themes/tree`, `GET /knowledge/recent` y `GET /knowledge/energy` con filtro por descendientes.
- Tabla `knowledge_energy` con seed manual (689 + base 50 = 739) y scraper seguro `scrape:knowledge` tras flag `BDO_SCRAPE_ENABLED`.

### Corregido
- Requisitos previos ahora se calculan por requisito (antes flag global replicado).
- Scraper aislado tras flag para no tumbar el arranque; energía con fallback `estimated`.

## [0.4.8] - 2026-09-03

### Añadido
- Sistema visual BDO consolidado con tokens CSS reales para colores, tipografia, superficies, radios, sombras y estados.
- Composicion responsive de autenticacion con iconos SVG dimensionados, centrado consistente y soporte para pantallas pequenas.
- Fuentes explicitas de Tailwind para plantillas HTML y componentes TypeScript.
- Configuracion de proxy Docker dedicada para enrutar `/api` al servicio backend.

### Cambiado
- Rediseño del App Shell con navegacion, marca, sidebar, profundidad visual y reticula ambiental.
- Rediseño del dashboard con hero de personaje, estadisticas interactivas, objetivo protagonista y paneles de actividad.
- Corregido el overflow horizontal producido por decoraciones transformadas en movil.
- Corregida la carga de dependencias PostCSS en el contenedor frontend.
- Ajustados los puertos documentados del backend a `3001` y la carga del archivo `.env` desde el workspace.

### Corregido
- Corregida la entrega de estilos globales para evitar paginas sin layout, con iconos gigantes o contenido colapsado a la izquierda.
- Corregido el acceso de autenticacion desde el frontend Docker.

## [0.4.7] - 2026-09-03

### Añadido
- Nuevo App Shell con sidebar por secciones, topbar con personaje activo y progreso global, drawer móvil y nav inferior
- Páginas nuevas: Personaje, Equipo, Progresión (árbol), Objetivos, Desafíos, LifeSkill, Aventuras y regiones, Conocimiento, Colecciones y logros, Ajustes
- Nuevos componentes reutilizables: section-heading, progress-ring, equipment-slot, item-card, activity-timeline
- Capa de datos mock separada (`core/mock/bdo-mock-data`) lista para sustituir por la API
- Dashboard rediseñado como centro del registro: perfil, progreso por pilares, siguiente objetivo recomendado, próximos objetivos y actividad reciente

## [0.4.3] - 2026-09-02

### Cambiado
- Componentes compartidos de interfaz actualizados (avatar, insignia, botón, tarjeta, modal, progreso)
- Formularios de autenticación mejorados (login, registro)
- Vistas de gestión de personajes mejoradas (lista, detalle, formulario)
- Diseño del panel refinado
- Estilos globales actualizados

## [0.4.2] - 2026-08-31

### Cambiado
- Rediseño completo de la interfaz con paleta Oro/Negro/Blanco
- Sistema de diseño simplificado eliminando variantes bronce/plata
- Todos los componentes usan acento dorado estricto sobre fondos negros con texto blanco
- Diseño responsive mejorado en todas las interfaces
- Contraste y accesibilidad mejorados con un esquema de colores más limpio

## [0.2.0] - 2026-08-29

### Añadido
- Entidad de usuario con email, nombre de usuario, hash de contraseña, avatar y estado de administrador
- Entidad de personaje con nombre, clase (24 clases de BDO), nivel, experiencia, puntuación de equipo y personaje de temporada
- Migraciones de base de datos para las tablas de usuarios y personajes con índices y claves foráneas adecuados
- Módulo de usuario con patrón repositorio (UserRepository, UserService, UserController)
- Módulo de personaje con patrón repositorio (CharacterRepository, CharacterService, CharacterController)
- Endpoints de API RESTful para la gestión de usuarios y personajes
- Documentación Swagger de los nuevos endpoints
- Hash de contraseñas con bcrypt (factor de coste 12)
- Configuración de TypeORM DataSource para migraciones por CLI

### Técnico
- Implementación del patrón repositorio para la capa de acceso a datos
- Claves primarias UUID para todas las entidades
- Borrado en cascada: los personajes se eliminan al eliminar el usuario
- Índices de base de datos en email, nombre de usuario, nombre de personaje y user_id
- Gestión del esquema basada en migraciones (sin synchronize en producción)
- Relaciones con tipos seguros mediante FindOptionsRelations

### Documentación
- ROADMAP.md actualizado con el estado de v0.2 completada
- CHANGELOG.md actualizado

## [0.1.0] - 2026-08-28

### Añadido
- Estructura inicial del proyecto con configuración de monorepo
- Frontend Angular 20 con Tailwind CSS v4
- Backend NestJS con TypeORM y PostgreSQL
- Docker Compose para el entorno de desarrollo
- Endpoints de salud (`/api/health`, `/api/health/ready`, `/api/health/live`)
- Documentación Swagger/OpenAPI en `/api/docs`
- Pipe global de validación con class-validator
- Configuración CORS para el frontend
- Configuración de ESLint y Prettier
- Repositorio Git con estructura de commits convencionales
- Configuración de entorno con .env.example
- package.json raíz del workspace con scripts útiles

### Técnico
- Modo estricto de TypeScript habilitado
- Frontend: componentes standalone, Signals, formularios reactivos
- Backend: módulos con arquitectura limpia, patrón repositorio, Guards
- Base de datos: TypeORM con synchronize en desarrollo
- Docker: builds multi-etapa para producción

### Documentación
- README.md con resumen del proyecto e instrucciones de instalación
- ARCHITECTURE.md con documentación detallada de la arquitectura
- CONTRIBUTING.md con guía de contribución
- ROADMAP.md con plan de versiones y seguimiento del progreso