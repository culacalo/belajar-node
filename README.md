## Prerequisites

- Install Node.js & NPM (https://nodejs.org/en/).
- Install Yarn (if you prefer this instead of NPM) (https://yarnpkg.com/en/).

## Usage Without Docker

- Clone/download this repo.
- Enter the directory.

  `cd belajar-node`

- Install packages dependency via NPM/Yarn.

  `npm install` / `yarn install`

- Setup all needed credentials in `.env`.
- Run the app.

    `node server.js`

- Hit [http://localhost:3000](http://localhost:3000) on your favorite browser.
- Learn and hack it!

## Usage With Docker
- Make sure you have installed docker and docker-compose on your machine
- Clone/download this repo.
- Enter the directory.

  `cd belajar-node`

- Run the app with docker-compose

    `sudo docker-compose up`

- Hit [http://localhost:3000](http://localhost:3000) on your favorite browser to open the apps.
- use [http://localhost:4000](http://localhost:4000) to open adminer and manage database.
- use PORT `33060` to connect mysql database from your mysql client.