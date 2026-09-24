FROM node:22-bookworm-slim AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ARG NPM_REGISTRY=https://registry.npmjs.org
ENV npm_config_registry=$NPM_REGISTRY
RUN npm install --global pnpm@11.9.0
WORKDIR /app

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --registry="$npm_config_registry"

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://okna-berta.ru
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1
RUN mkdir -p storage/media && BERTA_BUILD=1 PAYLOAD_SECRET=build-only-not-a-runtime-secret-000000000000 pnpm build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV DATABASE_URL=file:/app/storage/berta.db
ENV CMS_MEDIA_DIR=/app/storage/media
ARG NEXT_PUBLIC_SITE_URL=https://okna-berta.ru
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/seed ./seed
COPY --chown=node:node scripts/start.mjs ./scripts/start.mjs
RUN mkdir -p storage/media && chown -R node:node storage
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=180s --retries=5 CMD node -e "require('http').get('http://127.0.0.1:3000/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"
CMD ["node", "scripts/start.mjs"]
