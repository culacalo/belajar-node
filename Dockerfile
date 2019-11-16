FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install -g sequelize

RUN npm install -g sequelize-cli

RUN npm install

COPY . .

EXPOSE 3000

CMD ["nodemon"]