import Client from '../database';
import {Product} from "../utilities/types";

/**
 *  A ProductStore class which contains methods relating to products
 *  @class
 * **/
export class ProductStore {

    /**
     * Gets all products from the Product db
     * @async
     * @function getAllProducts
     * @returns {Promise<Product[] | null>} - Returns all products from the product database or null
     *                                        if there is no created product in the product db
     */
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

    /**
     * Gets a single product with the given product id from the Product db
     * @async
     * @function getProductById
     * @param {number} id - a product id
     * @returns {Promise<Product | null>} - Returns a single product from the product database or null if the product is not found
     */
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
            throw new Error(`Could not get a product ${id}: ${error}` )
        }
    }

    /**
     * Filters products by the given category in the Product db
     * @async
     * @function getProductByCategory
     * @param {string} category - a filter for the search
     * @returns {Promise<Product[] | null>} - Returns all products that matches the filter from the product database or
     *                                        null if there is no product that matches that category
     */
    async getProductByCategory(category: string): Promise<Product[] | null>{

        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await connection.query(sql, [category]);
            connection.release();
            //console.log(result, 'line 44 from controller')

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not get products by the given category ${category}: ${error}` )
        }
    }

    /**
     * Deletes all products in the Product db
     * @async
     * @function deleteProducts
     * @returns {Promise<Product[]} - Returns an empty list after deleting all users
     */
    async deleteProducts(): Promise<[]> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM products';
            const result = await connection.query(sql);
            connection.release();
            return [];
        }
        catch (error) {
            throw new Error(`Could not delete all products`);
        }
    }

    /**
     * Deletes a single product with the given product id in the Product db
     * @async
     * @function getProductByCategory
     * @param {number} id - deletes
     * @returns {Promise<Product[] | null>} - Returns a list of products from the Product db after deletion
     */
    async deleteProduct(id: number): Promise<Product[] | []>{

        try {
            const connection = await Client.connect();
            const sql =  'DELETE FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return [];
        }
        catch (error) {
            throw new Error(`Could not delete a product ${id}: ${error}` )
        }
    }

    /**
     * Shows the top 5 popular products from the product db
     * @async
     * @function getTopFivePopularProducts
     * @returns {Promise<Product[] | null>} - return a list top 5 popular products from the Product db
     */
    async getTopFivePopularProducts(): Promise<Product[] | null> {

        try {
            const connection = await Client.connect();
            const sql =  'SELECT products.name, SUM(products.price) as price, order_status, order_quantity FROM products INNER JOIN orders o on products.id = o.product_id WHERE o.order_status=($1) GROUP BY products.name, order_status, order_quantity ORDER BY SUM(order_quantity) DESC LIMIT 5';
            const result = await connection.query(sql, ['Completed']);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not the top five popular products: ${error}` )
        }
    }

    /**
     * Creates a product with the given product Object
     * @async
     * @function createProduct
     * @param {Object} product
     * @returns {Promise<Product | null>} - Returns the newly created product or null
     */
    async createProduct(product: Product): Promise<Product | null> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO products (name, price, category, description, image, in_stock, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
            const result = await connection.query(sql, [product.name, product.price, product.category, product.description, product.image, product.in_stock]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not create product ${product}: Error - ${error}`)
        }
    }
}