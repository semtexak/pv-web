# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/

WORKDIR /app/plugin
RUN npm install
RUN npm run build
RUN cp /app/plugin/dist/ /app/src/assets/plugin/
RUN rm -fr /app/plugin

ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY --from=build-stage /app/cert/prod/payvont.crt /etc/nginx/conf.d/payvont.crt
COPY --from=build-stage /app/cert/prod/payvont.rsa /etc/nginx/conf.d/payvont.rsa
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
