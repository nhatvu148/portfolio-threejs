VERSION 0.8

# Define build arguments
ARG PORTFOLIO_FRONTEND_PORT
ARG PORTFOLIO_NODE_ENV
ARG NODE_OPTIONS

frontend-deps:
    FROM --platform=linux/amd64 node:24-alpine
    WORKDIR /app

    COPY package*.json ./
    RUN npm ci --legacy-peer-deps

    SAVE ARTIFACT node_modules

frontend-build:
    FROM --platform=linux/amd64 node:24-alpine
    WORKDIR /app

    COPY +frontend-deps/node_modules ./node_modules

    COPY package*.json ./
    COPY vite.config.ts tsconfig*.json ./
    COPY tailwind.config.js postcss.config.js ./
    COPY .eslintrc.cjs ./
    COPY index.html ./
    COPY src ./src
    COPY public ./public

    # Set Node.js memory limit for large builds
    ENV NODE_OPTIONS=--max_old_space_size=8192
    ENV NODE_ENV=production

    RUN npm run build

    SAVE ARTIFACT dist dist

frontend-nginx-base:
    FROM --platform=linux/amd64 nginx:alpine

    COPY nginx.conf /etc/nginx/conf.d/default.conf

    EXPOSE 80

frontend-docker:
    FROM +frontend-nginx-base

    # Copy pre-built application from local dist
    # COPY dist /usr/share/nginx/html

    # Production frontend image (from source build)
    COPY +frontend-build/dist /usr/share/nginx/html

    SAVE IMAGE portfolio-frontend:latest

all:
    BUILD +frontend-docker