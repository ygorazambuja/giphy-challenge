# FROM node:14-alpine as test-stage
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm test

# build stage
# FROM node:14-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:14-alpine as production-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run test
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
