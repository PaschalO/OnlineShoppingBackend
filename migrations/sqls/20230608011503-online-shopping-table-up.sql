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

CREATE TABLE IF NOT EXISTS orders (
    id  SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    order_status CHAR(25) NOT NULL,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_products (
    order_id INTEGER,
    product_id INTEGER,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    order_quantity INTEGER,
    created_at TIMESTAMP,
    modified_at TIMESTAMP
);

