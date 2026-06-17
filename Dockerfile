FROM node:20-alpine AS deps
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS build
COPY . /app/
COPY --from=deps /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
