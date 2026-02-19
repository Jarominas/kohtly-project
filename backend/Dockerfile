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

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000) + '/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["sh", "-c", "npm run prisma:migrate:deploy && npm run start:prod"]