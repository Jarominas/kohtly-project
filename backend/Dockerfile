FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
COPY shared ./shared
COPY backend ./backend
# Install and Build
RUN npm install
WORKDIR /app/backend
RUN npx prisma generate
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/package.json ./
COPY --from=builder /app/backend/prisma ./prisma
COPY --from=builder /app/shared ./shared

CMD ["sh", "-c", "npm run prisma:migrate:deploy && npm run start:prod"]