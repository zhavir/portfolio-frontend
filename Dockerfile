FROM node:21.7.3-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

FROM node:21.7.3-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:21.7.3-alpine AS production
WORKDIR /app
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start"]