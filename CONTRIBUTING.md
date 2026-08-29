# Contributing Guide

Thank you for considering contributing to Black Desert Progress Tracker!

## Code of Conduct

By participating, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive criticism
- Accept feedback gracefully

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- Docker & Docker Compose
- Git

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/black-desert-progress-tracker.git
   cd black-desert-progress-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment file:
   ```bash
   cp .env.example .env
   ```
5. Start development services:
   ```bash
   npm run docker:up
   ```
6. Start applications in separate terminals:
   ```bash
   # Terminal 1
   npm run dev:backend
   
   # Terminal 2
   npm run dev:frontend
   ```

## Development Workflow

### Branch Naming

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feat/` | `feat/auth-login` |
| Bug Fix | `fix/` | `fix/health-check-timeout` |
| Documentation | `docs/` | `docs/api-endpoints` |
| Refactor | `refactor/` | `refactor/user-service` |
| Test | `test/` | `test/auth-integration` |
| Chore | `chore/` | `chore/update-dependencies` |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `test` - Adding missing tests
- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `security` - Security improvements
- `perf` - Performance improvements

Examples:
```
feat(auth): implement JWT authentication
fix(progress): prevent circular dependencies in progression tree
test(challenges): add recurrence tests for daily challenges
docs(readme): update installation guide
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with tests
3. Ensure all checks pass:
   ```bash
   npm run lint
   npm run test
   npm run build
   ```
4. Update documentation if needed
5. Create PR with clear description
6. Request review from maintainers
7. Address feedback
8. Squash and merge after approval

## Code Standards

### TypeScript

- Use strict mode
- Avoid `any` - use proper types
- Use interfaces for object shapes
- Use `type` for unions, primitives, tuples
- Prefer `const` over `let`
- Use meaningful variable names

### Angular (Frontend)

- Standalone components only
- Use Signals for state management
- Reactive Forms with Validators
- Lazy-load feature routes
- OnPush change detection
- Proper cleanup in `ngOnDestroy`/`destroyRef`

### NestJS (Backend)

- Constructor-based dependency injection
- DTOs with `class-validator` decorators
- Repository pattern for data access
- Guards for authentication/authorization
- Interceptors for cross-cutting concerns
- Global exception filter
- Swagger decorators on all endpoints

### Database

- All schema changes via migrations
- UUID primary keys
- Explicit foreign key constraints
- Indexes on frequently queried columns
- Soft deletes where appropriate

### Testing

- Unit tests for services and utilities
- Integration tests for controllers
- E2E tests for critical flows
- Target: >70% coverage on business logic
- Test file naming: `*.spec.ts`

### Git

- One logical change per commit
- Write meaningful commit messages
- Rebase feature branches before PR
- No force-push to shared branches

## Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Linting passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] No console.log/debugger left
- [ ] No hardcoded secrets
- [ ] Conventional commit messages

## Reporting Issues

Use GitHub Issues with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## Security Issues

Report security vulnerabilities privately to the maintainers. Do not create public issues.

## Questions?

Open a GitHub Discussion or reach out to maintainers.