FROM node:21.7.3-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/app/.npm npm set cache /app/.npm && npm install --ignore-scripts


FROM node:21.7.3-alpine AS production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "local"]