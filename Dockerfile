# Stage 1: Build the application
FROM node:18.16.0-alpine AS builder

WORKDIR /app

# Install global dependencies
RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:18.16.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

# Copy the built application
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma

# Install Prisma Client
RUN npx prisma generate

# Copy the entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "run", "start:prod"]

