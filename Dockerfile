# Single full-stack container for HealthTech Dashboard & SQLite DB
FROM node:20-alpine

WORKDIR /app

# Install native compilation dependencies (if needed by node-gyp)
RUN apk add --no-cache python3 make g++ gcc

# Install npm dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Build production React frontend assets
RUN npm run build

# Expose backend REST API & Web App port
EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

# Start combined Express + SQLite database server
CMD ["node", "server/index.js"]
