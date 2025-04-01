# Use an official Node.js image
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables (can be overridden by docker-compose)
# ENV NODE_ENV=production 

# Default command (can be overridden by docker-compose)
CMD ["npm", "run", "dev"]