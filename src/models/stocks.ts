import Client from '../database';
import {Stocks, Product} from "../utilities/types"


export class StockStore {
    async getAllStocks(): Promise<Stocks[] | Product[] | null> {
        try {
            const connection = await Client.connect();
            //const sql = 'SELECT * FROM orders';
            //const sql =
            // 'SELECT orders.id, u.firstname as firstname, u.lastname as lastname, p.name as product_name, p.price as product_price, p.description as product_description , p.image as product_image, orders.order_status as order_status, orders.order_quantity as order_quantity FROM orders INNER JOIN products p on p.id = orders.product_id INNER JOIN users u on u.id = orders.user_id';
            const sql =
                'SELECT stocks.id, p.name FROM stocks INNER JOIN products p on p.id = stocks.product_id';
            const result = await connection.query(sql);
            connection.release();

            if (result.rows.length > 0) return result.rows;

            return null;
        } catch (error) {
            throw new Error(`Could not get all products: ${error}`)
        }
    }

    async getStockById(id: number): Promise<Stocks[] | Product[] | null> {
        try {
            const connection = await Client.connect();
            const sql =
                'SELECT stocks.id, p.name FROM stocks INNER JOIN products p on p.id = stocks.product_id WHERE stocks.id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        } catch (error) {
            throw new Error(`Could not get a product: ${error}`)
        }
    }

    async updateStock(id: number, quantity: string): Promise<Stocks[] | null> {
        try {
            const connection = await Client.connect();
            const sql =
                'UPDATE stocks SET stock_quantity = $(2) WHERE id=($1)';
            const result = await connection.query(sql, [id, quantity]);
            connection.release();

            if (result.rows.length > 0) return result.rows[0];

            return null;
        } catch (error) {
            throw new Error(`Could not get a product: ${error}`)
        }
    }
}
