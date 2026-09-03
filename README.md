# Black Desert Progress Tracker

Una aplicación web full-stack profesional para jugadores de Black Desert Online que permite rastrear y gestionar la progresión de sus personajes.

## Características (Planificadas)

- 🎮 **Gestión de Personajes** - Múltiples personajes por usuario
- ⚔️ **Progresión de Combate** - Seguimiento de objetivos de mejora de equipo
- 🛠️ **Habilidades de Vida** - Cocina, Alquimia, Recolección, Pesca y más
- 🌳 **Árbol de Progresión** - Mapas de progresión visuales e interactivos
- 📅 **Desafíos Diarios/Semanales** - Desafíos recurrentes automatizados
- ⏰ **Recordatorios** - Notificaciones personalizadas para actividades del juego
- 🏆 **Logros** - Seguimiento de logros y hitos
- 📊 **Panel de Control** - Vista general completa de la progresión
- 🔍 **Búsqueda y Filtros** - Encuentra items, desafíos y objetivos rápidamente

## Stack Tecnológico

### Frontend
- **Angular 20** - Framework reactivo moderno
- **TypeScript** - Desarrollo con tipado fuerte
- **Tailwind CSS v4** - Estilos utility-first
- **RxJS** - Programación reactiva
- **Angular Signals** - Reactividad de grano fino

### Backend
- **NestJS** - Framework escalable de Node.js
- **TypeScript** - Desarrollo con tipado fuerte
- **TypeORM** - ORM de base de datos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación
- **Passport** - Estrategias de autenticación
- **Swagger/OpenAPI** - Documentación de API

### DevOps
- **Docker & Docker Compose** - Contenedores
- **GitHub Actions** - Pipeline CI/CD
- **Jest** - Framework de testing

## Estructura del Proyecto

```
black-desert-progress-tracker/
├── apps/
│   ├── frontend/          # Aplicación Angular
│   └── backend/           # Aplicación NestJS
├── database/
│   ├── migrations/        # Migraciones de base de datos
│   └── seeds/            # Datos iniciales
├── docs/                 # Documentación
├── docker/               # Configuraciones Docker
├── docker-compose.yml    # Configuración Docker para desarrollo
└── package.json          # Configuración workspace root
```

## Primeros Pasos

### Requisitos Previos

- Node.js 22+
- npm 10+
- Docker & Docker Compose
- Git

### Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd black-desert-progress-tracker
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar entorno:
```bash
cp .env.example .env
# Editar .env con tu configuración
```

4. Iniciar entorno de desarrollo:
```bash
# Iniciar base de datos y servicios
npm run docker:up

# En terminales separadas:
npm run dev:backend  # Inicia en http://localhost:3001
npm run dev:frontend # Inicia en http://localhost:4200
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev:backend` | Iniciar backend en modo desarrollo |
| `npm run dev:frontend` | Iniciar frontend en modo desarrollo |
| `npm run build` | Compilar todas las aplicaciones |
| `npm run test` | Ejecutar todos los tests |
| `npm run lint` | Lint de todas las aplicaciones |
| `npm run docker:up` | Iniciar contenedores Docker |
| `npm run docker:down` | Detener contenedores Docker |

## Documentación de la API

Cuando el backend esté corriendo, visita:
- **Swagger UI**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/api/health

## Desarrollo

### Estilo de Código

- TypeScript strict mode habilitado
- ESLint + Prettier para formateo de código
- Conventional Commits para mensajes de commit

### Testing

```bash
# Tests del backend
npm run test:backend

# Tests del frontend
npm run test:frontend

# Todos los tests
npm run test
```

## Hoja de Ruta

Ver [ROADMAP.md](docs/ROADMAP.md) para el plan detallado de versiones.

## Licencia

Licencia MIT - ver archivo LICENSE para detalles.