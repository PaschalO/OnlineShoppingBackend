import Client from '../database';
import {Order} from "../utilities/types";

export class OrderStore {
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
                'UPDATE orders SET order_quantity = $(2) WHERE id=($1)';
            const result = await connection.query(sql, [id, quantity]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a order: ${error}` )
        }
    }

    async deleteOrders(): Promise<void> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM orders';
            const result = await connection.query(sql);
            connection.release();

        }
        catch (error) {
            throw new Error(`Could not delete all orders: ${error}` );
        }
    }

    async createOrder(order: Order): Promise<Order | null> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO orders (id, user_id, product_id, order_status, order_quantity, created_at, modified_at) VALUES($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
            const result = await connection.query(sql, [order.id, order.user_id, order.product_id, order.order_status, order.order_quantity]);
            connection.release();
            if (result.rows.length > 0) return result.rows[0];

            return null
        }
        catch (error) {
            throw new Error(`Could not create an order ${order}: Error - ${error}`)
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