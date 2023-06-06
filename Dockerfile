# Base image
FROM node:14.21.2-alpine

# Set working directory
WORKDIR /app

# Environtment Variables
ENV PORT 5000

# Copy package.json
COPY package.json package.json

# Copy service account file
COPY credentials.json credentials.json

# Copy source code
COPY src ./src

# Copy uploads folder
COPY uploads ./uploads

# Copy Prisma schema file
COPY prisma ./prisma

# Install dependencies
RUN npm install --omit=dev

# Expose a port if needed
EXPOSE 5000

# Start the application
CMD [ "npm", "run", "start"]