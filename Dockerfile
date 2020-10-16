FROM node:alpine 
WORKDIR '/app' 
COPY package.json . 
RUN npm install 
RUN npm i rxjs-compat --save
RUN npm install ng2-completer --save-dev
COPY . . 
EXPOSE 4200 
CMD npm run start
