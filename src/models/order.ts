import Client from '../database';
import {Order} from "../utilities/types";

export class OrderStore {
    async getAllOrders(): Promise<Order[] | null> {
        try {
            const connection = await Client.connect();
            //const sql = 'SELECT * FROM orders';
            //const sql =
               // 'SELECT orders.id, u.firstname as firstname, u.lastname as lastname, p.name as product_name, p.price as product_price, p.description as product_description , p.image as product_image, orders.order_status as order_status, orders.order_quantity as order_quantity FROM orders INNER JOIN products p on p.id = orders.product_id INNER JOIN users u on u.id = orders.user_id';
            const sql =
                'SELECT * FROM orders INNER JOIN users u on u.id = orders.user_id';
            const result = await connection.query(sql);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        }
        catch (error) {
            throw new Error(`Could not get all products: ${error}` )
        }
    }

    async getOrderByUserId(userId: number): Promise<Order | null>{
        try {
            const connection = await Client.connect();
            const sql =
                'SELECT * FROM orders INNER JOIN users u on u.id = orders.user_id WHERE user_id=($1)';
            const result = await connection.query(sql, [userId]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a product: ${error}` )
        }
    }
    async getAllOrderByStatus(userId: number, status: string): Promise<Order | null>{
        try {
            const connection = await Client.connect();
            const sql =
                'SELECT * FROM orders INNER JOIN users u on u.id = orders.user_id WHERE user_id=($1) AND order_status=($2)';
            const result = await connection.query(sql, [userId, status]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        }
        catch (error) {
            throw new Error(`Could not get a product: ${error}` )
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
            throw new Error(`Could not get a product: ${error}` )
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
            throw new Error(`Could not get a product: ${error}` )
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
            throw new Error(`Could not get a product: ${error}` )
        }
    }

     */
}