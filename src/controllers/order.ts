import { OrderStore } from "../models/order";
import { Request, Response } from "express";
import { Order, OrderProduct } from "../utilities/types";
import { OrderProductStore } from "../services/orderProduct";

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
	try {
		const orders: Order[] | null = await store.getAllOrders();
		res.status(200).json(orders);
	} catch (error) {
		res.status(400).json({
			message: `unable to show all orders ${error}`
		});
	}
};

/**
 * shows a single order from the order db -  A json object of the queried order will be sent to the client if successful
 * @async
 * @function showSingleOrder
 * @type {req: Request, res: Response}
 * @returns {Promise<void>}
 */
const showSingleOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const userId: number = parseInt(req.params.id);
		const order: Order | null = await store.getOrderByUserId(userId);
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({
			message: `cannot find the order ${error}`
		});
	}
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
	try {
		const userId: number = parseInt(req.params.id);
		const status: string = req.params.status;
		const order: Order[] | null = await store.getAllOrderByStatus(
			userId,
			status
		);
		res.status(200).json(order);
	} catch (error) {
		res.status(400).json({
			message: `unable to find the status for this order ${error}`
		});
	}
};

export {
	showAllOrders,
	showSingleOrder,
	showOrderByStatus,
	createOrder
};
