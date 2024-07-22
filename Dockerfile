# Step 1: Build React App
FROM node:18 AS build

USER root

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./



RUN rm -rf node_modules package-lock.json

RUN npm install

# Install dependencies
RUN ls -la node_modules/.bin

# Copy all files
COPY . .

# ENV TSC_COMPILE_ON_ERROR=true

# Build the React app
RUN npm run build || true

EXPOSE 5173

CMD ["npm", "run", "dev"]
