import Client from "../database";
import { Request, Response } from "express";
import { OrderProduct } from "../utilities/types";

/**
 *  A OrderProductStore class which contains methods relating to order_product schema
 *  @class
 * **/
export class OrderProductStore {
	/**
	 * Adds the product to an order
	 * @async
	 * @function addProductOrder
	 * @params {OrderProduct} orderItem
	 * @returns {Promise<Order | null>} -
	 */
	async addProductOrder(
		orderItem: OrderProduct
	): Promise<OrderProduct | null> {
		const connection = await Client.connect();

		try {
			const sql =
				"INSERT INTO order_products (order_id, product_id, order_quantity, created_at, modified_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *";
			const result = await connection.query(sql, [
				orderItem.order_id,
				orderItem.product_id,
				orderItem.order_quantity
			]);
			connection.release();
			if (result.rows.length > 0) return result.rows[0];

			return null;
		} catch (error) {
			throw new Error(
				`Could insert an orderItem ${orderItem.order_id}, ${orderItem.product_id}. ${orderItem.order_quantity}: Error - ${error}`
			);
		}
	}

	/**
	 * Deletes all data in the order_product model
	 * @async
	 * @function deleteAllOrderProduct
	 * @returns {Promise<[]} - Returns an empty list after deletion
	 */
	async deleteAllOrderProduct(): Promise<[]> {
		try {
			const connection = await Client.connect();
			const sql = "DELETE FROM order_products";
			await connection.query(sql);
			connection.release();
			return [];
		} catch (error) {
			throw new Error(`Could not delete all orderItems`);
		}
	}
}

/**
 * adds product to an order to the order_product db
 * @async
 * @function addProduct
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const addProduct = async (req: Request, res: Response): Promise<void> => {
	const store: OrderProductStore = new OrderProductStore();

	try {
		const orderProduct: OrderProduct = {
			order_id: req.body.order_id,
			product_id: req.body.product_id,
			order_quantity: req.body.order_quantity
		};

		const newAddProductOrder: OrderProduct | null =
			await store.addProductOrder(orderProduct);
		res.status(200).json(newAddProductOrder);
	} catch (error) {
		res.status(400).json({
			message: `cannot create an orderItem ${error}`
		});
	}
};

export { addProduct };
