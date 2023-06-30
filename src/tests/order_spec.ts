
import {Order} from "../utilities/types";
import { OrderStore } from "../models/order";

const store: OrderStore = new OrderStore();

describe("Order Model", () => {

    let orders: Order[];
    let newOrder: Order| null;
    beforeEach(async (): Promise<void> => {

        orders = [
            {
                id: 1,
                user_id: 3,
                product_id: 5,
                order_status: "Active",
                order_quantity: 3,
            },
            {
                id: 2,
                user_id: 5,
                product_id: 3,
                order_status: "Completed",
                order_quantity: 4,
            },
            {
                id: 3,
                user_id: 2,
                product_id: 3,
                order_status: "Completed",
                order_quantity: 7,
            }
        ]

        for (const order of orders) {
            newOrder = await store.createOrder(order);
        }
    });

    afterEach(async (): Promise<void> => {
        //console.log('line 27 --  afterEach')
        await store.deleteOrders();
    });

    describe("it checks that Order Model methods are defined", () => {
        it('should have a getAllOrders method', () => {
            expect(store.getAllOrders).toBeDefined();
        });

        it('should have a getProductById method', () => {
            expect(store.getOrderByUserId).toBeDefined();
        });

        it('should have a getAllOrderByStatus method', () => {
            expect(store.getAllOrderByStatus).toBeDefined();
        });
    })


    describe("should check if there an order exist in the database", () => {
        it('checks if the order array is not empty', async (): Promise<void> => {
            const result: Order[] | null = await store.getAllOrders();
            expect(result).not.toBeNull();
            expect(result?.length).toBeGreaterThan(0);
        });
    });

    describe('should check if a order was returned from the database with the given order id', () => {

        it('checks that the returned order by ID is not null', async () => {
            const userId: number = 1;
            const result: Order | null = await store.getOrderByUserId(userId);
            expect(result).not.toBeNull();
        });

        it('checks for an order that was never made, returns null', async () => {
            const userId: number = 5
            const result: Order | null = await store.getOrderByUserId(userId);
            expect(result).toBeNull();
        });
    });

    describe('it should return a list of orders by status', () => {

        it('should return an array of orders by status', async () => {
            const status: string = 'Completed';
            const pattern: RegExp = /completed/i;
            const userId: number = 1;
            const result: Order[] | null = await store.getAllOrderByStatus(userId, status);

            if (result) {
                for (const order of result) {
                    expect(order.order_status).toMatch(pattern);
                }
            }
        });
    });
});