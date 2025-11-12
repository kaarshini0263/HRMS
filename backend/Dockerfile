# Use Node.js LTS version
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose port 4000
EXPOSE 4000

# Command to start the server
CMD ["npm", "run", "dev"]
