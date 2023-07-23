# Storefront Backend Project API

## Getting Started

This is an API for a shopping application website. It allows API consumers to interact with the application.

## Required Technologies
The project was developed with the following technologies below:
- Postgres for the database
- Node & express - `npm -v 9.5.1` && `node v18.16.1`
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine & supertest from npm for testing
- Typescript 
- bcrypt for hashing passwords from npm
- Docker
- Nodemon from npm
- Cors from npm
- Prettier from npm
- Eslint from npm

## DEVELOPMENT SETUP
- Clone the project
- Run `npm install` to run the dependencies required for the product

## DATABASE SETUP
- The development database name for this project is `online_shopping` but you can always create yours to a different name
- Run psql commands to connect: psql -d [your-database-name] -U [psql-username] -p [your pqsl port]
- **Example**: For the project, I used this on the terminal: psql -d online_shopping -U paschal -p 5432. 
- The test database name for this project is the `testdb`.

## MIGRATIONS SETUP
- To create migration to the target database, run `db-migrate up`

## ENV SETUP
- Here are the environmental variables used for this project
  - POSTGRES_DB=online_shopping
  - POSTGRES_USER=paschal
  - POSTGRES_PASSWORD=alex904
  - ENV=dev
  - POSTGRES_TEST_DB=testdb 
  - SALT_ROUNDS=10 
  - PEPPER=your-secret-password 
  - TOKEN_SECRET=user-test-for-udacity

## COMPILATION
- Run `npm run serve`. Uses nodemon to listen for file changes/edits

## TESTING
-`npm run test`
- Note: If you are using windows, in the package.json, change the script `"test": "SET ENV=test&& db-migrate -e test up && npm run testJB && db-migrate -e test reset"` to run the test db