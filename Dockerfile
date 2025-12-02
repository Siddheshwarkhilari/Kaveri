# ---- Base Image ----
FROM node:20
# Set working directory
WORKDIR /app
# Install PM2 globally
RUN npm install -g pm2
# Install TSX globally (you need it for "tsx server/index.ts")
RUN npm install -g tsx
# Install cross-env globally (since your dev script depends on it)
RUN npm install -g cross-env
# Copy package files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm install
RUN npm install cross-env --save-dev
# Copy entire project
COPY . .
# Expose the port your server uses
EXPOSE 5000
# Run PM2 in runtime mode to start your dev script
CMD ["pm2-runtime", "npm", "--", "run", "dev"]


