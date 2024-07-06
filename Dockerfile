# Stage 1: Build the application
FROM node:18.16.0-alpine AS builder

WORKDIR /app

# Install global dependencies
RUN npm install -g @nestjs/cli

COPY package*.json ./
RUN npm install

# Copy the prisma schema and generate the Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

RUN npm run build

# Stage 2: Run the application
FROM node:18.16.0-alpine

WORKDIR /app

# Install bash
RUN apk add --no-cache bash

COPY package*.json ./
RUN npm install --only=production

# Copy the built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Install Prisma Client
RUN npx prisma generate

# Ensure the entrypoint script has Unix line endings
RUN apk add --no-cache dos2unix
COPY docker-entrypoint.sh /usr/local/bin/
RUN dos2unix /usr/local/bin/docker-entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["bash", "/usr/local/bin/docker-entrypoint.sh"]

CMD ["npm", "run", "start:prod"]

