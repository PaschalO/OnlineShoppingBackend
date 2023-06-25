import { Order } from "../utilities/types";
import { OrderStore } from "../models/order";

const store: OrderStore = new OrderStore();

describe("Order Model", () => {

    // test to check the methods are defined
    it('should have a getAllProducts method', () => {
        expect(store.getAllOrders).toBeDefined();
    });

    it('should have a getProductById method', () => {
        expect(store.getOrderByUserId).toBeDefined();
    });

    it('should have a getAllOrderByStatus method', () => {
        expect(store.getAllOrderByStatus).toBeDefined();
    });

    it ('getAllProducts should return a list of all products', async () => {
        const result: Order[] | null = await store.getAllOrders();
        expect(result).toEqual(null);
    })
});