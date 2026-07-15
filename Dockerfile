# Astro static landing (T2-10). Two stages: node builds dist/, nginx serves it.
# `astro preview` is not a production server and the old image carried full
# node_modules (~600MB); this image is nginx:alpine + static files only.
#
# Local dev is unchanged: run `npm run dev` directly (no Docker needed).
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# T4-05: CTA target for "Log in / Start free trial" buttons. Astro inlines
# PUBLIC_* vars at build time, so this must be a build ARG (not runtime env).
# Compose passes it from .env; default = prod app login.
ARG PUBLIC_PLOKR_APP=https://app.plokr.com/auth/login
ENV PUBLIC_PLOKR_APP=$PUBLIC_PLOKR_APP
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
