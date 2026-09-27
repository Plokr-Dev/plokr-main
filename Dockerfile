# Astro static landing (T2-10). Two stages: node builds dist/, nginx serves it.
# `astro preview` is not a production server; this image is nginx + static files only.
#
# Base images are pinned by digest (tag kept for readability). To bump:
#   docker pull <image>:<tag> && docker inspect --format '{{index .RepoDigests 0}}' <image>:<tag>
#
# Local dev is unchanged: run `npm run dev` directly (no Docker needed).
FROM node:22-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# --ignore-scripts: no dependency install hooks run in the build.
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . .
# T4-05: CTA target for "Log in / Start free trial" buttons. Astro inlines
# PUBLIC_* vars at build time, so these must be build ARGs (not runtime env).
# Compose passes them from .env; default = prod app login. .env files are
# excluded from the build context (.dockerignore), so nothing else leaks in.
ARG PUBLIC_PLOKR_APP=https://app.plokr.com/auth/login
ARG PUBLIC_FORMSPREE_ENDPOINT=
ENV PUBLIC_PLOKR_APP=$PUBLIC_PLOKR_APP \
    PUBLIC_FORMSPREE_ENDPOINT=$PUBLIC_FORMSPREE_ENDPOINT
RUN npm run build

# nginx-unprivileged runs as uid 101 (non-root) with pid/temp paths already
# writable by that user.
FROM nginxinc/nginx-unprivileged:stable-alpine@sha256:4714e0b1b2577eaa1a6131d07c958b67f0eb68e6d0521e90c6e5287db8cf0bc5
# Keep container port 80 (root compose maps 3000:80) while running non-root:
# Docker (>= 20.10) and containerd set net.ipv4.ip_unprivileged_port_start=0
# inside the container network namespace, so uid 101 can bind :80 with no
# extra capability. (A setcap'd binary was rejected: it fails to exec under
# --security-opt no-new-privileges.) On a runtime without that sysctl, switch
# `listen` to 8080 and map 3000:8080 in the root compose instead.
USER root
RUN mkdir -p /etc/nginx/snippets
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=builder /app/dist /usr/share/nginx/html
USER 101
EXPOSE 80
