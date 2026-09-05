# Black Desert Progress Tracker - Hoja de ruta

> **Versión actual del proyecto: 0.5.0** — Sistema de conocimiento híbrido bdocodex + BDO.

## Resumen del progreso

| Versión | Funcionalidad | Estado | Pruebas | Etiqueta Git |
|---------|---------------|--------|---------|--------------|
| V0.1 | Base | ✅ | ✅ | v0.1.0 |
| V0.2 | Base de datos | ✅ | ✅ | v0.2.0 |
| V0.3 | Autenticación | ✅ | ✅ | v0.3.0 |
| V0.3.5 | Arranque del sistema e interfaz | ✅ | ✅ | v0.3.5 |
| V0.4 | Gestión de personajes | ✅ | ✅ | v0.4.0 |
| V0.4.1 | Tema BDO y sistema de diseño | ✅ | ✅ | v0.4.1 |
| V0.5 | Catálogo de items | 🟡 | 🟡 | v0.5.0 |
| V0.5.1 | Importación de datos BDO | ✅ | ✅ | v0.5.1 |
| V0.5.2 | Explorador de conocimiento | ✅ | ✅ | v0.5.2 |
| V0.5.3 | Sistema de conocimiento híbrido | ✅ | ✅ | v0.5.0 |
| V0.6 | Equipamiento de personaje | ⬜ | ⬜ | v0.6.0 |
| V0.7 | Árbol de progresión | ⬜ | ⬜ | v0.7.0 |
| V0.8 | Progresión de habilidades de vida | ⬜ | ⬜ | v0.8.0 |
| V0.9 | Sistema de desafíos | ⬜ | ⬜ | v0.9.0 |
| V0.10 | Desafíos recurrentes | ⬜ | ⬜ | v0.10.0 |
| V0.11 | Recordatorios | ⬜ | ⬜ | v0.11.0 |
| V0.12 | Panel de control | ⬜ | ⬜ | v0.12.0 |
| V0.13 | Sistema de logros | ⬜ | ⬜ | v0.13.0 |
| V0.14 | Búsqueda y filtros | ⬜ | ⬜ | v0.14.0 |
| V0.15 | Documentación de API | ⬜ | ⬜ | v0.15.0 |
| V0.16 | Ampliación de pruebas | ⬜ | ⬜ | v0.16.0 |
| V0.17 | Manejo de errores | ⬜ | ⬜ | v0.17.0 |
| V0.18 | Endurecimiento de seguridad | ⬜ | ⬜ | v0.18.0 |
| V0.19 | Docker de producción | ⬜ | ⬜ | v0.19.0 |
| V0.20 | Pipeline CI/CD | ⬜ | ⬜ | v0.20.0 |
| V0.21 | Sistema de seeds | ⬜ | ⬜ | v0.21.0 |
| V0.22 | Arquitectura de importación de datos | ⬜ | ⬜ | v0.22.0 |
| V0.23 | Motor de cálculo de progreso | ⬜ | ⬜ | v0.23.0 |
| V0.24 | Motor de recomendaciones diarias | ⬜ | ⬜ | v0.24.0 |
| V0.25 | Pulido y UX | ⬜ | ⬜ | v0.25.0 |
| V1.0 | Lanzamiento de producción | ⬜ | ⬜ | v1.0.0 |

## Detalle de versiones

### V0.1 — Base ✅ COMPLETADA
- [x] Repositorio Git inicializado
- [x] Estructura de monorepo creada
- [x] Frontend Angular 20 con Tailwind CSS v4
- [x] Backend NestJS con TypeORM
- [x] Docker Compose con PostgreSQL
- [x] Endpoints de salud
- [x] Documentación Swagger
- [x] ESLint + Prettier
- [x] Configuración de entorno
- [x] Documentación (README, ARCHITECTURE, CONTRIBUTING, ROADMAP)

### V0.2 — Base de datos ✅ COMPLETADA
- [x] Entidad de usuario
- [x] Entidad de personaje
- [x] Migraciones de base de datos
- [x] Configuración del patrón repositorio
- [x] Configuración de la base de datos
- [x] Pruebas de migración

### V0.3.5 — Arranque del sistema e interfaz ✅ COMPLETADA
- [x] Docker Compose con PostgreSQL, Backend y Frontend
- [x] Rutas del frontend (login, registro, panel)
- [x] Servicio de autenticación con gestión de tokens JWT
- [x] Guard de autenticación para rutas protegidas
- [x] Interceptor HTTP para adjuntar el token automáticamente
- [x] Página de login con validación
- [x] Página de registro con validación
- [x] Página de panel con información del usuario
- [x] Configuración de proxy para llamadas a la API
- [x] Stack completo corriendo en Docker
- [x] Endpoints de salud
- [x] Pruebas unitarias y de integración de autenticación

### V0.4.1 — Tema BDO y sistema de diseño ✅ COMPLETADA
- [x] Paleta de colores BDO (fondos oscuros, acentos oro/ámbar, plata, bronce)
- [x] Sistema tipográfico (Cinzel/IM Fell para encabezados, Inter/Crimson Text para cuerpo)
- [x] Componentes de interfaz reutilizables (botón, tarjeta, input, modal, insignia, avatar, progreso, tooltip)
- [x] Marcos estilo BDO (esquinas ornamentales, ribete dorado)
- [x] Texturas de fondo (pergamino, cuero, degradados oscuros)
- [x] Sistema de iconos (iconos de clase, ranuras de equipo, iconos de mejora)
- [x] Animaciones (efectos hover, transiciones, estados de carga)
- [x] Tema aplicado a: login, registro, panel y páginas de personaje
- [x] Diseño responsive con estética BDO

### V0.5 — Catálogo de items (EN CURSO)
- [x] Entidad de item
- [x] Entidad de categoría de item
- [x] Endpoints CRUD de administración
- [x] Dataset básico de items
- [x] Categorías: WEAPON, ARMOR, ACCESSORY, LIFESKILL, OTHER
- [ ] La prueba de regresión del frontend debe actualizarse desde la expectativa del scaffold antiguo
- [ ] El build Docker debe ejecutarse con Docker Desktop disponible

### V0.5.3 — Sistema de conocimiento híbrido ✅ COMPLETADA
- [x] Árbol de 11 ramas de conocimiento con conteos (totales/obtenidos) y filtro por descendientes
- [x] Endpoints `GET /knowledge/themes/tree`, `GET /knowledge/recent` y `GET /knowledge/energy`
- [x] Requisitos previos calculados por requisito (corrección del flag global)
- [x] Tabla `knowledge_energy` con seed manual (689 + base 50 = 739 como bdocodex)
- [x] Scraper seguro de bdocodex tras el flag `BDO_SCRAPE_ENABLED`
- [x] Página `/conocimiento` híbrida: buscador con Reiniciar, resumen de energía, detalle circular, últimos conocimientos
- [x] Marcar como obtenido / quitar con recarga de contadores
- [x] Pruebas: 23/23 en backend, build de frontend OK, verificación en vivo

### V0.6 — Equipamiento de personaje
- [ ] Entidad de equipamiento de personaje
- [ ] Ranuras de equipamiento (12 ranuras)
- [ ] Seguimiento de nivel de mejora
- [ ] Validación de ranuras
- [ ] Verificación de propiedad del usuario

### V0.7 — Árbol de progresión
- [ ] Entidad de nodo de progresión
- [ ] Relaciones padre-hijo
- [ ] Detección de ciclos
- [ ] Enum de estado (NOT_STARTED, IN_PROGRESS, COMPLETED, LOCKED)
- [ ] Visualización interactiva en el frontend
- [ ] Zoom, paneo y selección

### V0.8 — Progresión de habilidades de vida
- [ ] Entidad de habilidad de vida
- [ ] Entidad de nivel de habilidad de vida
- [ ] Entidad de habilidad de vida por personaje
- [ ] 10 habilidades de vida iniciales
- [ ] Seguimiento de nivel/EXP
- [ ] Árbol de progresión por habilidad

### V0.9 — Sistema de desafíos
- [ ] Entidad de desafío
- [ ] Tipos diario/semanal/mensual/personalizado
- [ ] Operaciones CRUD
- [ ] Seguimiento de finalización
- [ ] Registro de historial

### V0.10 — Desafíos recurrentes
- [ ] Lógica de generación automática
- [ ] Recurrencia diaria/semanal/mensual
- [ ] Prevención de duplicados
- [ ] Manejo de zonas horarias
- [ ] Pruebas de casos borde

### V0.11 — Recordatorios
- [ ] Entidad de recordatorio
- [ ] Patrones de recurrencia
- [ ] Operaciones CRUD
- [ ] Arquitectura lista para notificaciones

### V0.12 — Panel de control
- [ ] Resumen de personajes
- [ ] Progreso de combate
- [ ] Progreso de habilidades de vida
- [ ] Progreso de equipamiento
- [ ] Desafíos activos
- [ ] Próximos recordatorios
- [ ] % de progresión global

### V0.13 — Sistema de logros
- [ ] Entidad de logro
- [ ] Entidad de logro por personaje
- [ ] Logros predefinidos
- [ ] Desbloqueo automático

### V0.14 — Búsqueda y filtros
- [ ] Búsqueda global
- [ ] Componentes de filtro
- [ ] Opciones de orden
- [ ] Paginación
- [ ] Aplicado a todas las vistas de lista

### V0.15 — Documentación de API
- [ ] Documentación Swagger completa
- [ ] Todos los endpoints documentados
- [ ] Ejemplos de request/response
- [ ] Documentación de autenticación

### V0.16 — Ampliación de pruebas
- [ ] Pruebas unitarias de backend (>70%)
- [ ] Pruebas de integración de backend
- [ ] Pruebas E2E de backend
- [ ] Pruebas de componentes frontend
- [ ] Pruebas de servicios frontend

### V0.17 — Manejo de errores
- [ ] Filtro global de excepciones
- [ ] Formato de error estandarizado
- [ ] Manejo de errores en frontend
- [ ] Mensajes amigables para el usuario
- [ ] Logging estructurado

### V0.18 — Endurecimiento de seguridad
- [ ] Revisión de JWT
- [ ] Revisión de hash de contraseñas
- [ ] Configuración CORS
- [ ] Rate limiting
- [ ] Cabeceras de seguridad
- [ ] Prevención de inyección SQL
- [ ] Auditoría de validación de inputs

### V0.19 — Docker de producción
- [ ] Builds multi-etapa
- [ ] Health checks
- [ ] Configuraciones de producción
- [ ] Persistencia de PostgreSQL
- [ ] Aislamiento de red

### V0.20 — Pipeline CI/CD
- [ ] Workflow de GitHub Actions
- [ ] Lint en PR
- [ ] Tests en PR
- [ ] Build en PR
- [ ] Build Docker en PR

### V0.21 — Sistema de seeds
- [ ] Comando de seed
- [ ] Items iniciales
- [ ] Categorías iniciales
- [ ] Habilidades de vida
- [ ] Desafíos
- [ ] Nodos de progresión

### V0.22 — Arquitectura de importación de datos
- [ ] Abstracción de fuente de datos
- [ ] Capa de parseo
- [ ] Capa de validación
- [ ] Capa de normalización
- [ ] Logging de importación

### V0.23 — Motor de cálculo de progreso
- [ ] Cálculo de progreso global
- [ ] Progreso por categoría
- [ ] Resolución de dependencias
- [ ] Detección de bloqueado/desbloqueado
- [ ] Requisitos faltantes
- [ ] Alta cobertura de pruebas

### V0.24 — Motor de recomendaciones diarias
- [ ] Algoritmo determinista
- [ ] Puntuación de prioridad
- [ ] Análisis de dependencias
- [ ] Conciencia de plazos
- [ ] Interfaz "¿Qué debería hacer hoy?"

### V0.25 — Pulido y UX
- [ ] Diseño responsive
- [ ] Estados de carga
- [ ] Estados vacíos
- [ ] Estados de error
- [ ] Animaciones
- [ ] Accesibilidad (WCAG AA)
- [ ] Navegación por teclado

### V1.0 — Lanzamiento de producción
- [ ] Suite completa de pruebas en verde
- [ ] Auditoría de seguridad completa
- [ ] Benchmarks de rendimiento
- [ ] Documentación completa
- [ ] Registro de cambios completo
- [ ] Despliegue verificado

## Hitos

| Hito | Versión objetivo | Descripción |
|------|------------------|-------------|
| M1: Base principal | V0.3 | Autenticación + personajes funcionando |
| M2: Núcleo de progresión | V0.8 | Equipamiento + árbol + habilidades de vida |
| M3: Funcionalidades de juego | V0.12 | Desafíos + recordatorios + panel |
| M4: Pulido y escala | V0.20 | Pruebas + seguridad + CI/CD |
| M5: Inteligencia | V0.24 | Cálculos + recomendaciones |
| M6: Lista para producción | V1.0 | Calidad de lanzamiento |

## Notas

- Cada versión debe pasar todas las validaciones antes de continuar
- No se permite saltar versiones
- Pruebas de regresión requeridas para cada versión
- Documentación actualizada con cada versión
- Etiquetas Git creadas para cada versión completada
