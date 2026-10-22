# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.18.0
FROM node:${NODE_VERSION}-bookworm-slim AS base
WORKDIR /app
ENV NUXT_TELEMETRY_DISABLED=1 \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=90s --retries=6 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health/database',{signal:AbortSignal.timeout(4000)}).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

FROM base AS dependencies
COPY package.json package-lock.json ./
# Nuxt prepare needs the project sources, copied in the following stages.
RUN npm ci --ignore-scripts

FROM dependencies AS development
COPY --chown=node:node . .
RUN npx nuxt prepare && chown -R node:node /app
ENV NODE_ENV=development
USER node
CMD ["npm", "run", "dev:container"]

FROM dependencies AS build
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/.output ./.output
RUN mkdir -p /storage/uploads && chown -R node:node /storage
USER node
CMD ["node", ".output/server/index.mjs"]

FROM postgres:16-bookworm AS operations
WORKDIR /app
ENTRYPOINT []
COPY --from=base /usr/local/bin/node /usr/local/bin/node
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json package-lock.json ./
RUN groupadd --gid 1000 node && useradd --uid 1000 --gid node --create-home node
COPY --chown=node:node scripts ./scripts
COPY --chown=node:node server ./server
COPY --chown=node:node shared ./shared
RUN apt-get update && apt-get install -y --no-install-recommends restic && rm -rf /var/lib/apt/lists/* && mkdir -p /storage/uploads /backup && chown -R node:node /storage /backup
USER node
CMD ["node", "--import", "tsx", "scripts/worker.ts"]
