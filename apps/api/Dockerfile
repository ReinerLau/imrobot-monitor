FROM node:lts

ENV DATABASE_URL=mysql://root:password@host.docker.internal:3308/imrobot_monitor

COPY dist /app/dist
COPY package.json /app/package.json
COPY src/schema /app/src/schema
COPY drizzle.config.ts /app/drizzle.config.ts

WORKDIR /app

RUN npm install

CMD npm run db:init && npm run start:prod 

EXPOSE 3001