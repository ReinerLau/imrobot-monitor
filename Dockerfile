FROM node:lts

ENV DATABASE_URL=mysql://root:password@host.docker.internal:3308/imrobot_monitor

COPY apps/api/dist /app/apps/api/dist
COPY apps/api/package.json /app/apps/api/package.json

COPY packages/schema/src /app/packages/schema/src
COPY packages/schema/tsup.config.ts /app/packages/schema/tsup.config.ts
COPY packages/schema/package.json /app/packages/schema/package.json

COPY packages/db/drizzle.config.ts /app/packages/db/drizzle.config.ts
COPY packages/db/package.json /app/packages/db/package.json

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY pnpm-workspace.yaml /app/pnpm-workspace.yaml

WORKDIR /app

RUN npm install pnpm -g

RUN pnpm install

CMD ["pnpm", "run", "deploy:serve"]

EXPOSE 3001