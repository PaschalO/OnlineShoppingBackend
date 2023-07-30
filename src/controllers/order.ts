import { OrderStore } from "../models/order";
import { Request, Response } from "express";
import { Order, OrderProduct } from "../utilities/types";

const store: OrderStore = new OrderStore();

/**
 * creates an order from the req.body object. A status code of 200, and the newly created order will be sent to the client
 *             if the creation was successful or a status code of 400 if not successful
 * @async
 * @function createOrder
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const createOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const order: Order = {
			user_id: req.body.user_id,
			order_status: req.body.order_status.toLowerCase()
		};

		const newOrder: Order | null = await store.createOrder(order);
		res.status(200).json(newOrder);
	} catch (error) {
		res.status(400).json({ message: `cannot create an order ${error}` });
	}
};

/**
 * shows a list of all orders from the order db - A json object of all order will be sent to the client if successful
 * @async
 * @function showAllOrders
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showAllOrders = async (req: Request, res: Response): Promise<void> => {
	const orders: Order[] | null = await store.getAllOrders();
	res.status(200).json(orders);
};

/**
 * shows a single order from the order db -  A json object of the queried order will be sent to the client if successful
 * @async
 * @function showSingleOrder
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showSingleOrder = async (req: Request, res: Response): Promise<void> => {
	const userId: number = parseInt(req.params.id);
	const order: Order | null = await store.getOrderByUserId(userId);
	res.status(200).json(order);
};

/**
 * Shows a list of all orders made by the user . A json object containing a list of all orders by the status for the queried user will be sent to the client
 * @async
 * @function showOrderByStatus
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showOrderByStatus = async (
	req: Request,
	res: Response
): Promise<void> => {
	const userId: number = parseInt(req.params.id);
	const status: string = req.params.status;
	const order: Order[] | null = await store.getAllOrderByStatus(
		userId,
		status
	);
	res.status(200).json(order);
};

/**
 * delete all orders from the order db
 * @async
 * @function deleteUsers
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const deleteOrders = async (req: Request, res: Response): Promise<void> => {
	const order: [] = await store.deleteOrders();
	res.status(200).json(order);
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
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
			message: `cannot create an orderItem	 ${error}`
		});
	}
};

export {
	showAllOrders,
	showSingleOrder,
	showOrderByStatus,
	createOrder,
	deleteOrders,
	addProduct
};
