# Black Desert Progress Tracker

A professional full-stack web application for Black Desert Online players to track and manage their character progression.

## Features (Planned)

- 🎮 **Character Management** - Multiple characters per user
- ⚔️ **Combat Progression** - Track gear enhancement goals
- 🛠️ **Life Skills** - Cooking, Alchemy, Gathering, Fishing, and more
- 🌳 **Progression Tree** - Visual interactive progression maps
- 📅 **Daily/Weekly Challenges** - Automated recurring challenges
- ⏰ **Reminders** - Custom notifications for game activities
- 🏆 **Achievements** - Track accomplishments
- 📊 **Dashboard** - Comprehensive overview of progression
- 🔍 **Search & Filters** - Find items, challenges, and goals quickly

## Tech Stack

### Frontend
- **Angular 20** - Modern reactive framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **RxJS** - Reactive programming
- **Angular Signals** - Fine-grained reactivity

### Backend
- **NestJS** - Scalable Node.js framework
- **TypeScript** - Type-safe development
- **TypeORM** - Database ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Passport** - Auth strategies
- **Swagger/OpenAPI** - API documentation

### DevOps
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **Jest** - Testing framework

## Project Structure

```
black-desert-progress-tracker/
├── apps/
│   ├── frontend/          # Angular application
│   └── backend/           # NestJS application
├── database/
│   ├── migrations/        # Database migrations
│   └── seeds/            # Seed data
├── docs/                 # Documentation
├── docker/               # Docker configurations
├── docker-compose.yml    # Development Docker setup
└── package.json          # Root workspace config
```

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- Docker & Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd black-desert-progress-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development environment:
```bash
# Start database and services
npm run docker:up

# In separate terminals:
npm run dev:backend  # Starts on http://localhost:3000
npm run dev:frontend # Starts on http://localhost:4200
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev:backend` | Start backend in development mode |
| `npm run dev:frontend` | Start frontend in development mode |
| `npm run build` | Build all applications |
| `npm run test` | Run all tests |
| `npm run lint` | Lint all applications |
| `npm run docker:up` | Start Docker containers |
| `npm run docker:down` | Stop Docker containers |

## API Documentation

When the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health

## Development

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier for code formatting
- Conventional Commits for commit messages

### Testing

```bash
# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend

# All tests
npm run test
```

## Roadmap

See [ROADMAP.md](docs/ROADMAP.md) for detailed version plan.

## License

MIT License - see LICENSE file for details.