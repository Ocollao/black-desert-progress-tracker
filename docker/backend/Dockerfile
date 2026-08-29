# Development stage
FROM node:22-alpine AS development

WORKDIR /app

COPY apps/backend/package*.json ./

RUN npm ci --legacy-peer-deps

COPY apps/backend .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

COPY apps/backend/package*.json ./

RUN npm ci --only=production --legacy-peer-deps

COPY apps/backend .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]