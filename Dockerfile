# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package.json

# Install dependencies
RUN npm install --omit=dev

# Copy service account file
COPY credentials.json credentials.json

# Copy source code
COPY src ./src

# Copy Prisma schema file
COPY prisma ./prisma

# Expose a port if needed
EXPOSE 5000

# Start the application
CMD [ "npm", "run", "start" ]