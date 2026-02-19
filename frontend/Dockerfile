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
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 4000) + '/').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
CMD ["node", "dist/frontend/server/server.mjs"]
