FROM node:lts AS build
COPY . /PoliChess-FRONT/
WORKDIR /PoliChess-FRONT/
RUN npm i
RUN export NG_CLI_ANALYTICS=false
RUN npm run build

FROM nginx:alpine AS run
RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=build /PoliChess-FRONT/dist/poli-chess/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/