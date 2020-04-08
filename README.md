# Pokedex

This application helps you to find out the information about a pokemon. You can add more pokemons and also update the existing information about a pokemon.

## Prerequisites

- Node >= v10.19.0
- npm >= 6.13.4
- MongoDB

## Installation

1. Clone the repository
   ```bash
   $ git clone https://github.com/aditya81070/pokedex.git
   ```
2. Change current working directory
   ```bash
   $ cd pokedex
   ```
3. Import data in your local mongo database
   ```bash
    # Please make sure that `mongod` is running locally with port :27017
    $ mongoimport --db=pokdex --collection=pokemons --file=./db/pokedex.json
   ```
4. Create a `.env` file and copy content from `.env.sample`.
5. Install the dependencies
   1. Client (front-end)
      ```bash
      $ cd client
      $ yarn #if you don't have `yarn`, use `npm install`
      # start client sever
      $ yarn start #with npm use `npm start`
      ```
   1. Server (back-end)
      ```bash
      # In new terminal
      # Change current working directly to `pokedex`
      $ cd server
      $ npm install
      $ npm start
      ```
6. Open [local server](http://localhost:3000) in your favorite browser.
