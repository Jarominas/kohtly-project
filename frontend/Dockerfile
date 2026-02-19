FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
COPY shared ./shared
COPY frontend ./frontend
RUN npm install
WORKDIR /app/frontend
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/frontend/dist ./dist
# Standard path for Angular SSR
CMD ["node", "dist/frontend/server/server.mjs"]