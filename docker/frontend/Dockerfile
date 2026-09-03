# Development stage
FROM node:22-alpine AS development

WORKDIR /app

COPY apps/frontend/package*.json ./

RUN npm install

COPY apps/frontend .

EXPOSE 4200

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--poll", "2000", "--proxy-config", "proxy.docker.conf.json"]

# Production stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY apps/frontend/package*.json ./

RUN npm install

COPY apps/frontend .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]