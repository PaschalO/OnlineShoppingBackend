import { OrderStore } from "../models/order";
import {Request, Response} from "express";
import {Order} from "../utilities/types";

const store: OrderStore = new OrderStore();

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const order: Order  = {
            user_id: req.body.user_id,
            product_id: req.body.product_id,
            order_status: req.body.order_status,
            order_quantity: req.body.order_quantity
        }

        const newOrder: Order | null = await store.createOrder(order);
        res.status(200).json(newOrder);
    }

    catch (err){
        res.status(400).json(err);
    }
}

const showAllOrders = async (req: Request, res: Response): Promise<void> => {
    const orders: Order[] | null = await store.getAllOrders();
    res.status(200).json(orders);
}

const showSingleOrder = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.user_id);
    const order: Order | null = await store.getOrderByUserId(userId);
    res.status(200).json(order);
}

const showOrderByStatus = async (req: Request, res:Response): Promise<void> => {
    const userId: number = req.body.id;
    const status: string = req.body.status;
    const order: Order[] | null = await store.getAllOrderByStatus(userId, status);
    res.status(200).json(order);
}

const deleteOrders = async (req: Request, res: Response): Promise<void> => {
    const userId: number = parseInt(req.params.user_id);
    const order = await store.deleteOrders();
    res.status(200).json(order);
}

export { showAllOrders, showSingleOrder, showOrderByStatus, createOrder }
