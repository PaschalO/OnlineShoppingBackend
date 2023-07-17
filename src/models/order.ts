import Client from '../database';
import {Order} from "../utilities/types";

/**
 *  A OrderStore class which contains methods relating to order schema
 *  @class
 * **/
export class OrderStore {

    /**
     * Gets all orders from the Order db
     * @async
     * @function getAllOrders
     * @returns {Promise<Order[] | null>} - Returns all orders from the order database or null
     *                                       if there is no created order in the Orders db
     */
    async getAllOrders(): Promise<Order[] | null> {
        try {
            const connection = await Client.connect();
            //const sql = 'SELECT * FROM orders';
            //const sql =
               // 'SELECT orders.id, u.firstname as firstname, u.lastname as lastname, p.name as product_name, p.price as product_price, p.description as product_description , p.image as product_image, orders.order_status as order_status, orders.order_quantity as order_quantity FROM orders INNER JOIN products p on p.id = orders.product_id INNER JOIN users u on u.id = orders.user_id';
            //const sql =
                //'SELECT * FROM orders INNER JOIN users u on u.id = orders.user_id';
            const sql =
                'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not get all order: ${error}` );
        }
    }

    /**
     * Finds all order(s) for a particular user by the userId from the Order db
     * @async
     * @function getOrderByUserId
     * @param {number} userId - a user id
     * @returns {Promise<Order | null>} - Returns a single order from the order database or null if the order is not found
     */
    async getOrderByUserId(userId: number): Promise<Order | null>{
        try {
            const connection = await Client.connect();
            const sql =
                'SELECT * FROM orders WHERE user_id=($1)';
            //const sql =
               // 'SELECT * FROM orders INNER JOIN users u on u.id = orders.user_id WHERE user_id=($1)';
            const result = await connection.query(sql, [userId]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a order: ${error}` );
        }
    }

    /**
     * Provides the order with the given userId
     * @async
     * @function getAllOrderByStatus
     * @params {number, string} userId, status - statuses accepted are 'completed', 'active', 'pending' etc
     * @returns {Promise<Order[] | null>} - Returns a list of orders by status for a given user
     */
    async getAllOrderByStatus(userId: number, status: string): Promise<Order[] | null>{
        try {
            const connection = await Client.connect();
            //const sql =
                //'SELECT * FROM orders INNER JOIN users u on u.id = orders.user_id WHERE user_id=($1) AND order_status=($2)';
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)';
            const result = await connection.query(sql, [userId, status]);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not get an order by status ${error}` );
        }
    }

    /**
     * Deletes a single order in the Order db
     * @async
     * @function deleteOrders
     * @returns {Promise<[]>} - Returns an empty list after the deletion of all orders in the Order db
     */
    async deleteOrders(): Promise<[]> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return [];

        }
        catch (error) {
            throw new Error(`Could not delete all orders: ${error}` );
        }
    }

    /**
     * Creates a single order in the Order db
     * @async
     * @function deleteOrders
     * @param {Object} order - An object contain an order
     * @returns {Promise<[]>} - Returns an empty list after the deletion of all orders in the Order db
     */

    async createOrder(order: Order): Promise<Order | null> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, product_id, order_status, order_quantity, created_at, modified_at) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
            const result = await connection.query(sql, [order.user_id, order.product_id, order.order_status, order.order_quantity]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not create an order ${order}: Error - ${error}`)
        }
    }

    async updateOrderByStatus(id: number, status: string): Promise<Order | null>{
        try {
            const connection = await Client.connect();
            const sql =
                'UPDATE orders SET order_status = $(2) WHERE id=($1)';
            const result = await connection.query(sql, [id, status]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a order: ${error}` )
        }
    }

    async updateOrderByQuantity(id: number, quantity: string): Promise<Order | null>{
        try {
            const connection = await Client.connect();
            const sql =
                'UPDATE orders SET order_quantity = $(2) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id, quantity]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a order: ${error}` )
        }
    }

    /*
    async deleteOrderByUserId(userId: number): Promise<Order | null>{
        try {
            const connection = await Client.connect();
            const sql =
                'DELETE FROM orders WHERE user_id=($1)';
            const result = await connection.query(sql, [userId]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a order: ${error}` )
        }
    }

     */
}