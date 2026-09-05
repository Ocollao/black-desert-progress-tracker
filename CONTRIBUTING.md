# Guía de contribución

> **Versión actual del proyecto: 0.5.0**

Gracias por considerar contribuir a Black Desert Progress Tracker.

## Código de conducta

Al participar, se espera que cumplas nuestro código de conducta:
- Sé respetuoso e inclusivo
- Da la bienvenida a los recién llegados
- Céntrate en la crítica constructiva
- Acepta los comentarios con amabilidad

## Primeros pasos

### Requisitos previos

- Node.js 22+
- npm 10+
- Docker y Docker Compose
- Git

### Configuración de desarrollo

1. Haz un fork del repositorio
2. Clona tu fork:
   ```bash
   git clone https://github.com/TU_USUARIO/black-desert-progress-tracker.git
   cd black-desert-progress-tracker
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Copia el archivo de entorno:
   ```bash
   cp .env.example .env
   ```
5. Inicia los servicios de desarrollo:
   ```bash
   npm run docker:up
   ```
6. Inicia las aplicaciones en terminales separadas:
   ```bash
   # Terminal 1
   npm run dev:backend

   # Terminal 2
   npm run dev:frontend
   ```

## Flujo de trabajo

### Nombres de rama

| Tipo | Prefijo | Ejemplo |
|------|--------|---------|
| Funcionalidad | `feat/` | `feat/auth-login` |
| Corrección | `fix/` | `fix/health-check-timeout` |
| Documentación | `docs/` | `docs/api-endpoints` |
| Refactor | `refactor/` | `refactor/user-service` |
| Pruebas | `test/` | `test/auth-integration` |
| Tarea | `chore/` | `chore/update-dependencies` |

### Mensajes de commit

Sigue los [Commits Convencionales](https://www.conventionalcommits.org/) **en español**:

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[pie opcional]
```

Tipos:
- `feat` - Nueva funcionalidad
- `fix` - Corrección de error
- `docs` - Solo documentación
- `style` - Formato, punto y coma faltantes, etc.
- `refactor` - Cambio de código que ni corrige un error ni añade funcionalidad
- `test` - Añadir pruebas faltantes
- `chore` - Tareas de mantenimiento
- `ci` - Cambios de CI/CD
- `security` - Mejoras de seguridad
- `perf` - Mejoras de rendimiento

Ejemplos:
```
feat(auth): implementa autenticación JWT
fix(progreso): evita dependencias circulares en el árbol de progresión
test(desafíos): añade pruebas de recurrencia para desafíos diarios
docs(readme): actualiza la guía de instalación
```

### Proceso de Pull Request

1. Crea una rama de funcionalidad desde `master`
2. Haz tus cambios con pruebas
3. Asegúrate de que todas las comprobaciones pasen:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
4. Actualiza la documentación si es necesario (en español)
5. Crea el PR con una descripción clara
6. Solicita revisión de los mantenedores
7. Atiende los comentarios
8. Squash and merge tras la aprobación

## Estándares de código

### TypeScript

- Usa el modo estricto
- Evita `any` - usa tipos adecuados
- Usa interfaces para formas de objetos
- Usa `type` para uniones, primitivas y tuplas
- Prefiere `const` sobre `let`
- Usa nombres de variables significativos

### Angular (Frontend)

- Solo componentes standalone
- Usa Signals para gestión de estado
- Formularios reactivos con validadores
- Rutas de funcionalidad con carga perezosa
- Detección de cambios OnPush
- Limpieza adecuada en `ngOnDestroy`/`destroyRef`

### NestJS (Backend)

- Inyección de dependencias por constructor
- DTOs con decoradores de `class-validator`
- Patrón repositorio para acceso a datos
- Guards para autenticación/autorización
- Interceptores para concerns transversales
- Filtro global de excepciones
- Decoradores Swagger en todos los endpoints (resúmenes en español)

### Base de datos

- Todos los cambios de esquema vía migraciones
- Claves primarias UUID
- Restricciones de clave foránea explícitas
- Índices en columnas consultadas con frecuencia
- Borrados suaves donde aplique

### Pruebas

- Pruebas unitarias para servicios y utilidades
- Pruebas de integración para controladores
- Pruebas E2E para flujos críticos
- Objetivo: >70% de cobertura en lógica de negocio
- Nomenclatura de archivos de prueba: `*.spec.ts`
- **Regla del proyecto**: por cada cambio o petición se ejecutan pruebas y se reinicia el servidor indicando la versión actual y los enlaces de acceso

## Lista de verificación del Pull Request

- [ ] El código sigue las guías de estilo
- [ ] Autorrevisión completada
- [ ] Pruebas añadidas/actualizadas
- [ ] Todas las pruebas pasan
- [ ] El lint pasa
- [ ] El build funciona
- [ ] Documentación actualizada (en español)
- [ ] Sin console.log/debugger olvidados
- [ ] Sin secretos hardcodeados
- [ ] Mensajes de commit convencionales en español

## Reportar problemas

Usa los Issues de GitHub con:
- Título y descripción claros
- Pasos para reproducir
- Comportamiento esperado vs actual
- Detalles del entorno
- Capturas si aplica

## Problemas de seguridad

Reporta las vulnerabilidades de seguridad en privado a los mantenedores. No crees issues públicos.

## ¿Preguntas?

Abre una discusión en GitHub Discussions o contacta a los mantenedores.
