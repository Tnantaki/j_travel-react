# Stage 1: Build using Bun
FROM oven/bun:1 AS builder

WORKDIR /app

COPY . .

# Install dependencies using Bun
RUN bun install

# Build the React + Vite app
RUN bun run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output
COPY --from=builder /app/dist /usr/share/nginx/html/j_travel-react

# Add custom nginx config to support React Router (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3050

CMD ["nginx", "-g", "daemon off;"]
