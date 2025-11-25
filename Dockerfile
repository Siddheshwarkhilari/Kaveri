FROM node:18-alpine

WORKDIR /app

# Install PM2 globally
RUN npm install -g pm2

# Copy dependency manifests
COPY package.json package-lock.json ./
COPY server/package.json server/package-lock.json ./server/
COPY client/package.json client/package-lock.json ./client/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd client && npm install

# Copy full source
COPY . .

# Expose backend port
EXPOSE 5000

# Start using PM2 (your root-level process)
CMD ["pm2-runtime", "kaverigsautomech"]
