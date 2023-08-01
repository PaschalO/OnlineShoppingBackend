/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS orders (
      id  SERIAL PRIMARY KEY,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      order_status CHAR(25) NOT NULL,
      created_at TIMESTAMP,
      modified_at TIMESTAMP
);