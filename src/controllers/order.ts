import { OrderStore } from "../models/order";
import {Request, Response} from "express";
import {Order} from "../utilities/types";

const store = new OrderStore();

const showAllOrders = async (req: Request, res: Response) => {
    const orders: Order[] | null = await store.getAllOrders();
    res.status(200).json(orders);
}

const showSingleOrders = async (req: Request, res: Response) => {
    const orderId: number = req.body.id;
    const order: Order | null = await store.getOrderByUserId(orderId);
    res.status(200).json(order);
}

const showOrderByStatus = async (req: Request, res:Response) => {
    const userId: number = req.body.id;
    const status: string = req.body.status;
    const order: Order[] | null = await store.getAllOrderByStatus(userId, status);
    res.status(200).json(order);
}

export { showAllOrders, showSingleOrders, showOrderByStatus}
