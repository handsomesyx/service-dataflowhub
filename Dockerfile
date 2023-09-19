FROM node:16 AS builder
# Create app directory
WORKDIR /app
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
#RUN yarn config set registry https://registry.npm.taobao.org/
# Install app dependencies
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn run build



FROM node:16
WORKDIR /app
COPY --from=builder /app/src/modules/searchEngine/provinces.json ./src/modules/searchEngine/
COPY --from=builder /app/src/modules/searchEngine/idCard.json ./src/modules/searchEngine/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/.env ./.env

EXPOSE 7000
CMD [ "yarn", "run", "start:prod" ]
