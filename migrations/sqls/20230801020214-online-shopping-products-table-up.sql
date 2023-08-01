/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS products (
    id  SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    price FLOAT(10) NOT NULL,
    category VARCHAR(40) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR NOT NULL,
    in_stock BOOLEAN NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);