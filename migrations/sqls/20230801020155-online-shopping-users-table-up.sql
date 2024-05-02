/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS users (
     id  SERIAL PRIMARY KEY,
     auth0_user_id VARCHAR(255) UNIQUE,
     firstname VARCHAR(60) NOT NULL,
     lastname VARCHAR(60) NOT NULL,
     email VARCHAR NOT NULL,
     password VARCHAR NOT NULL,
     role VARCHAR(5),
     created_at TIMESTAMP,
     modified_at TIMESTAMP
);