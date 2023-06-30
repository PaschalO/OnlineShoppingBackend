import Client from '../database';
import {Product} from "../utilities/types";

export class ProductStore {
    async getAllProducts(): Promise<Product[] | null> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not get all products: ${error}` )
        }
    }

    async getProductById(id: number): Promise<Product | null>{
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a product: ${error}` )
        }
    }

    async getProductByCategory(category: string): Promise<Product[] | null>{

        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category LIKE $1';
            const result = await connection.query(sql, [`%${category}%`]);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a product: ${error}` )
        }
    }

    async deleteProducts(): Promise<void> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM products';
            const result = await connection.query(sql);
            connection.release();
        }
        catch (error) {
            throw new Error(`Could not delete product `);
        }
    }

    async deleteProduct(id: number): Promise<Product | null>{

        try {
            const connection = await Client.connect();
            const sql =  'DELETE FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a product: ${error}` )
        }
    }

    async getTopFivePopularProducts(): Promise<Product[] | null>{

        try {
            const connection = await Client.connect();
            const sql =  'SELECT products.name, SUM(products.price) as p_name FROM products INNER JOIN orders o on products.id = o.product_id WHERE o.order_status=($1) GROUP BY products.name ORDER BY SUM(products.price) DESC LIMIT 5';
            const result = await connection.query(sql, ['Completed']);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a product: ${error}` )
        }
    }

    async createProduct(product: Product): Promise<Product | null> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO products (id, name, price, category, description, image, in_stock, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
            const result = await connection.query(sql, [product.id, product.name, product.price, product.category, product.description, product.image, product.in_stock]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not create product ${product}: Error - ${error}`)
        }
    }
}