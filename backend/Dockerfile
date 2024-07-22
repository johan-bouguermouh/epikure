FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install husky globally
RUN npm install -g husky

# Install dependencies
RUN npm install --legacy-peer-deps


# Install typeorm and mysql2
RUN npm install --save @nestjs/typeorm typeorm mysql2 --legacy-peer-deps

# install bcrypt
RUN npm install bcrypt --save --legacy-peer-deps
RUN npm i -D @types/bcrypt --save --legacy-peer-deps
RUN npm rebuild bcrypt

RUN npm install @nestjs/jwt @nestjs/passport passport passport-jwt --legacy-peer-deps


# Copy the rest of the application code
COPY . .

# Copy the env files
COPY .env ./

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]