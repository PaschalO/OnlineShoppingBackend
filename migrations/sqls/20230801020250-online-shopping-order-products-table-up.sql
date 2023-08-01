/* Replace with your SQL commands */

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