# CSC 456 - Sylica Backend

This is the backend service for the Sylica project. It was developed by Zeal Patel, Mehidi Shohag, Saiful Islam, Joy Biswas, MD Islam for our Topics In Software Engineering class.

Sylica is an E-commerce platform for electronic devices.

## Setup

##### Clone the repository

```
git clone https://github.com/saifulislamdev/sylica-backend.git
```

##### Install dependencies

Run the following to install all the necessary dependendcies

```
npm i
```

##### Setup env file

Create a `.env` file in the root of the repository, and past the `dbURI` with the key was `DB_URI`

## Repo Structure

All of the source code will be found in `src` folder.
`/src/server.js` is the entry point of the application.

##### Helper functions

Write any helper functions that can be reused in other places in `src/helpers` folder

##### Utility functions

Write any utility functions in `src/utils` folder

##### MongoDB models

Write MongoDB models in `src/models` folder

##### REST Routes

In the `server.js` file, import your routes from `src/routes` and structure the url as `/api/something`

Create a route file for each model that will conist of the REST methods.

- Write the middlewares for these routes in `src/routes/middlewares` folder.
- Name a POST middleware as createModelName
- Name a GET middleware as getModelName
- Name a PUT/ PATCH middleware as updateModelName
- Name a DELETE middleware as deleteModelName

## Available scripts

#### `npm run server`

Starts a nodemon server that watches changes to your JavaScript code and refresh the server without having to run node command after each change.

It should print `Server started on port 5000` and `MongoDB Connected` if everything ran correctly.

Run this script to make requests using Postman.
