
#Hashme admin 
npm start

#building docker image
docker build -t yogeshcl/angular-app .
docker images
docker run -d -it -p 80:80/tcp --name angular-app
yogeshcl/angular-app:latest




FROM node:latest

RUN git clone https://github.com/yogeshclm/adminpanel.git /var/www \
    && cd /var/www \
    && npm install --global rimraf \
    && npm run clean \
    && npm install --global bower typings webpack webpack-dev-server typescript \
    && bower install --allow-root \
    && npm run typings -- install \
    && npm install \
    && npm run prebuild:prod && npm run build:prod

EXPOSE 8080

WORKDIR /var/www
ENTRYPOINT ["npm", "run", "server:prod"]


FROM node:alpine  //small image
WORKDIR '/app'     // make this as workdir in docker
COPY package.json .   // create a copy so every times its not updates,updates only when changes found
RUN npm install 
COPY . .            // copies current director full to the workdir 
EXPOSE 4200         // angular port 
CMD npm run start   // run cmd



version: "3" //pull latest version
services: 
  myapp:     //name of the app
    build: .       // . current directios
    ports:
      - "8080:4200"     // public expose port 8080
    volumes:
      - "/app/node_modules"
      - ".:/app"



FROM node:alpine 
WORKDIR '/app' 
COPY package.json . 
RUN npm install 
COPY . . 
EXPOSE 4200 
CMD npm run start

