/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS users (
     id  SERIAL PRIMARY KEY,
     firstname VARCHAR(60) NOT NULL,
     lastname VARCHAR(60) NOT NULL,
     email VARCHAR NOT NULL,
     password VARCHAR NOT NULL,
     role VARCHAR(5),
     created_at TIMESTAMP,
     modified_at TIMESTAMP
);
